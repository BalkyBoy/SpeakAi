import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto'
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ){}

  async register(dto: RegisterDto) {
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
        emailVerificationToken: emailToken
      },
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const verificationUrl = `${frontendUrl}/auth/verify-email?token=${emailToken}`;

    return {message: 'Registered. Verify your email.', verificationUrl, userId: user.id};
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({where: {email: dto.email}});
    if (!user) throw new BadRequestException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new BadRequestException('Invalid credentials');

    if (!user.isEmailVerified) throw new BadRequestException('Email not verified');

    const payload = {sub: user.id, email: user.email};
    const accessToken = this.jwtService.sign(payload);

    return {accessToken, user};
  }

  async verifyEmail(dto: VerifyEmailDto) {
    const user = await this.prisma.user.findFirst({where: {emailVerificationToken: dto.token}})
    if(!user) throw new BadRequestException('Invalid token');

    await this.prisma.user.update({
      where: {id: user.id},
      data: {
        isEmailVerified: true,
        emailVerificationToken: null
      }
    });

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
        resetPasswordToken: null,
        passwordResetExpires: null
      }
    });

    return {message: 'Password reset successfully'};
  }
}
