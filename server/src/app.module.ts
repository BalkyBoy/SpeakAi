import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, LessonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
