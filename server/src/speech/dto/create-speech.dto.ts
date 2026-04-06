import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AnalyzeSpeechDto {
  @IsNotEmpty()
  audioFile?: any;

  @IsNotEmpty()
  @IsString()
  targetWord?: string;

  @IsNotEmpty()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  phonetic?: string;
}

export class CompareSpeechDto {
  @IsNotEmpty()
  userAudio?: any;

  @IsNotEmpty()
  referenceAudio?: any;

  @IsNotEmpty()
  @IsString()
  language?: string;
}

export class GenerateAudioDto {
  @IsNotEmpty()
  @IsString()
  word?: string;

  @IsNotEmpty()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  voice?: string;

  @IsOptional()
  speed?: number;

  @IsOptional()
  emphasizePhonemes?: string[];
}

export class CreateSpeechDto {}
