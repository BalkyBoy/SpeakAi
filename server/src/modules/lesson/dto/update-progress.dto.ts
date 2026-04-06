// src/modules/lesson/dto/update-progress.dto.ts
import { IsOptional, IsNumber, IsEnum, Min, Max } from 'class-validator';

export enum ProgressStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export class UpdateProgressDto {
  @IsOptional()
  @IsEnum(ProgressStatus)
  status?: ProgressStatus;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  score?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  timeSpentSecs?: number;
}