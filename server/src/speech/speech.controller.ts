import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SpeechService } from './speech.service';
import { CreateSpeechDto } from './dto/create-speech.dto';
import { UpdateSpeechDto } from './dto/update-speech.dto';
import {
  AnalyzeSpeechDto,
  CompareSpeechDto,
  GenerateAudioDto,
} from './dto/create-speech.dto';

@Controller('speech')
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}

  /**
   * Get supported languages
   * GET /speech/supported-languages
   */
  @Get('supported-languages')
  async getSupportedLanguages() {
    return this.speechService.getSupportedLanguages();
  }

  /**
   * Get phonemes for a language
   * GET /speech/phonemes/:language
   */
  @Get('phonemes/:language')
  async getPhonemes(@Param('language') language: string) {
    return this.speechService.getPhonemes(language);
  }

  /**
   * Analyze pronunciation from audio
   * POST /speech/analyze
   */
  @Post('analyze')
  @UseInterceptors(FileInterceptor('audioFile'))
  async analyzeSpeech(
    @UploadedFile() audioFile: any,
    @Body() dto: AnalyzeSpeechDto,
  ) {
    if (!audioFile) {
      throw new BadRequestException('Audio file is required');
    }

    // Create a new Dto object with the uploaded file
    const analyzeDtoWithFile: AnalyzeSpeechDto = {
      ...dto,
      audioFile,
    };

    // TODO: Get userId from request (from JWT token)
    const userId = 'user-id'; // Placeholder
    return this.speechService.analyzeSpeech(analyzeDtoWithFile, userId);
  }

  /**
   * Compare two audio samples
   * POST /speech/compare
   */
  @Post('compare')
  @UseInterceptors(FilesInterceptor('audio', 2))
  async compareSpeech(
    @UploadedFiles() files: Array<any>,
    @Body() dto: CompareSpeechDto,
  ) {
    if (!files || files.length < 2) {
      throw new BadRequestException('Two audio files are required');
    }

    const compareDtoWithFiles: CompareSpeechDto = {
      ...dto,
      userAudio: files[0],
      referenceAudio: files[1],
    };

    // TODO: Get userId from request (from JWT token)
    const userId = 'user-id'; // Placeholder
    return this.speechService.compareSpeech(compareDtoWithFiles, userId);
  }

  /**
   * Generate audio for a word
   * POST /speech/generate-audio
   */
  @Post('generate-audio')
  async generateAudio(@Body() dto: GenerateAudioDto) {
    return this.speechService.generateAudio(dto);
  }

  // Legacy CRUD endpoints
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
  update(
    @Param('id') id: string,
    @Body() updateSpeechDto: UpdateSpeechDto,
  ) {
    return this.speechService.update(+id, updateSpeechDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speechService.remove(+id);
  }
}
