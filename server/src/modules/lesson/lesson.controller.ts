import { Controller, Get, Post, Body, Param, Put, UseGuards, Query } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators';
import type { User } from '@prisma/client';
import { SearchLessonDto } from './dto/search-lesson.dto';

@Controller('lesson')
@UseGuards(JwtAuthGuard)
export class LessonController {
  constructor(private readonly lessonService: LessonService) { }


  @Get('recommend')
  getRecommended(@CurrentUser() user: User) {
    return this.lessonService.getRecommendedLessons(user.id);
  }

  @Get('search')
  search(@Query() dto: SearchLessonDto, @CurrentUser() user: User) {
    return this.lessonService.searchLessons(dto, user.id);
  }

  @Get(':id')
  getLessonById(@Param('id') id: string, @CurrentUser() user: User) {
    return this.lessonService.getLessonById(id, user.id);
  }

  @Post(':id/start')
  startLesson(@Param('id') id: string, @CurrentUser() user: User) {
    return this.lessonService.startLesson(id, user.id);
  }

  @Put('id/progress')
  updateProgress(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() dto: UpdateLessonDto,
  ) {
    return this.lessonService.updateProgress(id, user.id, dto);
  }
}
