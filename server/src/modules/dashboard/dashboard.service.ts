import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class DashboardService {
    constructor(private readonly prisma: PrismaService) { }
    async getDashboardData(userId: string) {
        const [stats, recentLessons, achievements] = await Promise.all([
            this.prisma.userStats.findUnique({
                where: { userId },
            }),

            this.prisma.lessonProgress.findMany({
                where: { userId },
                include: { lesson: true },
                orderBy: { completedAt: 'desc' },
                take: 5,
            }),

            this.prisma.userAchievement.findMany({
                where: { userId },
                include: { achievement: true },
            })
        
    ]);
    return {
        streak: stats?.currentStreak ?? 0,

        stats: {
            totalPracticeMinutes: stats?.totalPracticeMinutes ?? 0,
            lessonsCompleted: stats?.lessonsCompleted ?? 0,
            averageAccuracy: stats?.averageAccuracy ?? 0,
            currentStreak: stats?.currentStreak ?? 0,
        },

        recentLessons: recentLessons.map((lesson)=> ({
            id: lesson.lesson.id,
            title: lesson.lesson.title,
            progress: lesson.progress,
            // difficulty: lesson.diffuculty,
            completedAt: lesson.completedAt,
        })),

        achievements: achievements.map((achievement) => ({
        id: achievement.achievement.id,
        title: achievement.achievement.title,
        description: achievement.achievement.description,
        icon: achievement.achievement.icon,
        earnedAt: achievement.earnedAt,
      })),

    }
    }
}