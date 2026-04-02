import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResendVerificationDto } from 'src/modules/auth/dto/resend-verification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async updateEmailVerification(userId: string, token: string, isVerified?: boolean): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        isEmailVerified: isVerified,
        emailVerificationToken: token || undefined
      }
    })
  }

  async updateUserProfile(userId: string, data: UpdateUserDto) {
    return await this.prisma.user.update({where: { id: userId }, data});
  }

}
