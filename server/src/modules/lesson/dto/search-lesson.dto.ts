import { Level } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class SearchLessonDto {
    @IsOptional()
    @IsString()
    q?: string;

    @IsOptional()
    @IsString()
    language?: string;

    @IsOptional()
    @IsEnum(Level)
    level?: Level;
}