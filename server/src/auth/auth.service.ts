import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto'
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from '../shared/mail/mail.service';
import { Response } from 'express';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private mailService: MailService
  ){}

  setAuthCookie(res: Response, accesstoken: string, refreshToken: string) {
    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', accesstoken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    })
  }

  clearAuthCookie(res: Response) {
    const isProd = process.env.NODE_ENV === 'production';
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
    });
  }

  signAccessToken(userId: string, email: string) {
    return this.jwtService.sign(
      { sub: userId, email },
      { secret: process.env.JWT_SECRET, expiresIn: '15m' }
    );
  }

  signRefreshToken(userId: string, email?: string) {
    return this.jwtService.sign(
      { sub: userId },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '30d' }
    );
  }

  async register(dto: RegisterDto) {
   try{
     const existing = await this.prisma.user.findUnique({where: {email: dto.email}});
    if (existing) throw new ConflictException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const emailToken = crypto.randomBytes(32).toString('hex');

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: hashedPassword,
        firstName:dto.firstName,
        lastName:dto.lastName,
        nativeLanguage: dto.nativeLanguage,
        learningLanguage: dto.learningLanguage,
        isEmailVerified: false,
        emailVerificationToken: emailToken,
      },
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const verificationUrl = `${frontendUrl}/auth/verify-email?token=${emailToken}`;

    console.log('Sending email directly...');
    try {
      await this.mailService.sendMail({
        to: user.email,
        subject: 'Verify your email',
        template: 'verify-email',
        context: { verificationUrl, firstName: user.firstName }
      });
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail registration if email fails
    }
    return {message: 'Registered. Verify your email.', verificationUrl, userId: user.id};
   } catch (error) {
    if (error instanceof ConflictException) {
      throw error;
    }
    console.error('Error during registration:', error);
    throw new BadRequestException('Registration failed');
   }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({where: {email: dto.email}});
    if (!user) throw new BadRequestException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new BadRequestException('Invalid credentials');

    if (!user.isEmailVerified) throw new BadRequestException('Email not verified');

    const payload = {sub: user.id, email: user.email};
    const accessToken = this.signAccessToken(user.id, user.email);
    const refreshToken = this.signRefreshToken(user.id, user.email);

    await this.prisma.user.update({
      where: {id: user.id},
      data: {
         refreshTokenHash: await bcrypt.hash(refreshToken, 10),
         refreshTokenExpires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      }
    });

    return {accessToken, refreshToken, user};
  }

  async verifyEmail(res: Response,dto: VerifyEmailDto) {
    const user = await this.prisma.user.findFirst({where: {emailVerificationToken: dto.token}})
    if(!user) throw new BadRequestException('Invalid token');

    const updatedUser = await this.prisma.user.update({
      where: {id: user.id},
      data: {
        isEmailVerified: true,
        emailVerificationToken: undefined
      }
    });

    const accessToken = this.signAccessToken(updatedUser.id, updatedUser.email);
    const refreshToken = this.signRefreshToken(updatedUser.id, updatedUser.email);

    this.setAuthCookie(res, accessToken, refreshToken);

    return {message: 'Email verified successfully'};
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({where: {email: dto.email}})
    if (!user) return {message: 'If the account exists, a reset link has been sent'};

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000);

    await this.prisma.user.update({
      where: {id: user.id},
      data: {
        resetPasswordToken: resetToken,
        passwordResetExpires: resetExpires
      }
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${resetToken}`;
    
    try {
      await this.mailService.sendMail({
        to: user.email,
        subject: 'Reset your password',
        template: 'reset-password',
        context: { resetUrl, firstName: user.firstName }
      });
    } catch (emailError) {
      console.error('Failed to send reset email:', emailError);
    }

    return {message: 'Reset password link sent', resetUrl}
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({where: {resetPasswordToken: dto.token, passwordResetExpires: {gte: new Date()}}});
    if(!user) throw new BadRequestException('Invalid token');

    const hashed = await bcrypt.hash(dto.newPassword, 12);
    await this.prisma.user.update({
      where: {id: user.id},
      data: {
        passwordHash: hashed,
        resetPasswordToken: undefined,
        passwordResetExpires: undefined
      }
    });

    return {message: 'Password reset successfully'};
  }

  async refresh(refreshToken: string) {
  try {
    const payload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || !user.refreshTokenHash)
      throw new BadRequestException('Invalid refresh token');

    const valid = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );

    if (!valid) throw new BadRequestException('Invalid refresh token');

    const newAccessToken = this.signAccessToken(user.id, user.email);
    const newRefreshToken = this.signRefreshToken(user.id);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        refreshTokenHash: await bcrypt.hash(newRefreshToken, 10),
      },
    });

    return { newAccessToken, newRefreshToken };
  } catch {
    throw new BadRequestException('Invalid refresh token');
  }
}

}


