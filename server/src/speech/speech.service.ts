import { Injectable } from '@nestjs/common';
import { CreateSpeechDto } from './dto/create-speech.dto';
import { UpdateSpeechDto } from './dto/update-speech.dto';

@Injectable()
export class SpeechService {
  create(createSpeechDto: CreateSpeechDto) {
    return 'This action adds a new speech';
  }

  findAll() {
    return `This action returns all speech`;
  }

  findOne(id: number) {
    return `This action returns a #${id} speech`;
  }

  update(id: number, updateSpeechDto: UpdateSpeechDto) {
    return `This action updates a #${id} speech`;
  }

  remove(id: number) {
    return `This action removes a #${id} speech`;
  }
}
