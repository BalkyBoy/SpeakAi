import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpeechService } from './speech.service';
import { CreateSpeechDto } from './dto/create-speech.dto';
import { UpdateSpeechDto } from './dto/update-speech.dto';

@Controller('speech')
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}

  @Post()
  create(@Body() createSpeechDto: CreateSpeechDto) {
    return this.speechService.create(createSpeechDto);
  }

  @Get()
  findAll() {
    return this.speechService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speechService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpeechDto: UpdateSpeechDto) {
    return this.speechService.update(+id, updateSpeechDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speechService.remove(+id);
  }
}
