import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './shared/mail/mail.module';
import { QueueModule } from './shared/queue/queue.module';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { ConfigModule } from '@nestjs/config';
import { SpeechModule } from './speech/speech.module';
import appConfig from './config/app.config';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    AuthModule,
    UserModule,
    LessonModule,
    DashboardModule,
    PrismaModule,
    MailModule,
    QueueModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD || undefined,
      },
    }),
    }),
    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter,
    }),
    SpeechModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
