import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchLessonDto } from './dto/search-lesson.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) { }
  async getLessonById(id: string, userId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        words: { orderBy: { order: 'asc' } },
        categories: { include: { category: true } },
        progress: {
          where: { userId },
          select: {
            progress: true,
            completed: true,
            lastAccuracy: true,
            startedAt: true,
            completedAt: true,
          },
        },
      },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    if (!lesson.isPublished) throw new NotFoundException('Lesson not found');

    const { progress, ...rest } = lesson;
    return { ...rest, userProgress: progress[0] ?? null };
  }

  async searchLessons(dto: SearchLessonDto, userId: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        isPublished: true,
        ...(dto.language && { language: dto.language }),
        ...(dto.level && { level: dto.level }),
        ...(dto.q && {
          OR: [
            { title: { contains: dto.q, mode: 'insensitive' } },
            { description: { contains: dto.q, mode: 'insensitive' } },
          ],
        }),
      },
      include: {
        categories: { include: { category: true } },
        progress: {
          where: { userId },
          select: { progress: true, completed: true },
        },
      },
      orderBy: { rating: 'desc' },
    });
    return lessons.map(({ progress, ...lesson }) => ({
      ...lesson,
      userProgress: progress[0] ?? null,
    }));
  }
  async getRecommendedLessons(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { learningLanguage: true },
    });

    if (!user) throw new NotFoundException('User not found');

    const completed = await this.prisma.lessonProgress.findMany({
      where: { userId, completed: true },
      select: { lessonId: true },
    });
    const completedIds = completed.map((p) => p.lessonId);

    const lessons = await this.prisma.lesson.findMany({
      where: {
        isPublished: true,
        id: { notIn: completedIds },
        language: user.learningLanguage,
      },
      take: 10,
      orderBy: [{ rating: 'desc' }, { studentCount: 'desc' }],
      include: {
        categories: { include: { category: true } },
        progress: {
          where: { userId },
          select: { progress: true, completed: true },
        },
      },
    });
    if (lessons.length === 0) {
      return this.prisma.lesson.findMany({
        where: {
          isPublished: true,
          id: { notIn: completedIds },
          language: user.learningLanguage,
        },
        take: 10,
        orderBy: [{ rating: 'desc' }, { studentCount: 'desc' }],
      });
    }
    return lessons.map(({ progress, ...lesson }) => ({
      ...lesson,
      userProgress: progress[0] ?? null,
    }));
  }

  async startLesson(lessonId: string, userId: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });
    if (!lesson || !lesson.isPublished)
      throw new NotFoundException('Lesson not found');

    const progress = await this.prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      create: {
        userId,
        lessonId,
        progress: 0,
        completed: false,
        startedAt: new Date(),
      },
      update: {
        startedAt: new Date(),
      },
    });

    const isFirstTime = !progress.startedAt;
    if (isFirstTime) {
      await this.prisma.lesson.update({
        where: { id: lessonId },
        data: { studentCount: { increment: 1 } },
      });
    }
    return {
      lessonId,
      started: true,
      progress: progress.progress,
      completed: progress.completed,
      startedAt: progress.startedAt,
    };
  }
  async updateProgress(
    lessonId: string,
    userId: string,
    dto: UpdateProgressDto,
  ) {
    const existing = await this.prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });

    if (!existing) {
      throw new BadRequestException(
        'Start the lesson before updating progress',
      );
    }

    const isCompleting = dto.status === 'COMPLETED' && !existing.completed;

    const updated = await this.prisma.lessonProgress.update({
      where: { userId_lessonId: { userId, lessonId } },
      data: {
        ...(dto.score !== undefined && {
          progress: dto.score, // maps score → progress (0-100)
          lastAccuracy: dto.score,
        }),
        ...(isCompleting && {
          completed: true,
          completedAt: new Date(),
        }),
      },
    });

    // If just completed, check & award achievements
    if (isCompleting) {
      await this.checkAchievements(userId);
    }

    return updated;
  }

  private async checkAchievements(userId: string) {
    const completedCount = await this.prisma.lessonProgress.count({
      where: { userId, completed: true },
    });

    const milestones: Record<number, string> = {
      1: 'First Lesson Completed',
      5: '5 Lessons Completed',
      10: '10 Lessons Completed',
      20: '20 Lessons Completed',
      50: '50 Lessons Completed',
    };

    const milestone = milestones[completedCount];
    if (!milestone) return;
    const achievement = await this.prisma.achievement.findFirst({
      where: { type: milestone },
    });

    if (!achievement) return;

    await this.prisma.userAchievement.upsert({
      where: {
        userId_achievementId: { userId, achievementId: achievement.id },
      },
      create: { userId, achievementId: achievement.id },
      update: {},
    });
  }
}
