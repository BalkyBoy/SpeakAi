import { Module } from '@nestjs/common';
import { SpeechService } from './speech.service';
import { SpeechController } from './speech.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SpeechController],
  providers: [SpeechService, PrismaService],
  exports: [SpeechService],
})
export class SpeechModule {}
