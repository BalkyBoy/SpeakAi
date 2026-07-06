"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/app/providers/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Mic, Play, Trophy, Clock, Target, TrendingUp,
  BookOpen, Award, Calendar, Sparkles, ChevronRight,
  Globe, Loader2,
} from "lucide-react"
import Link from "next/link"
import { DashboardSkeleton } from "./components/dashboard-skeleton"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  dashboardControllerGetDashboardDataOptions,
  lessonControllerGetAllOptions,
  lessonControllerStartLessonMutation,
} from "../client/@tanstack/react-query.gen"

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApiLesson {
  id: string
  title: string
  description: string
  language: string
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  duration: number          // minutes
  rating: number
  studentCount: number
  categories: { category: { name: string } }[]
  userProgress: { progress: number; completed: boolean } | null
}

interface ApiLessonsResponse {
  data: ApiLesson[]
  meta: { total: number; page: number; limit: number; totalPages: number }
}

interface ApiDashboardData {
  streak: number
  totalPracticeTime: string
  lessonsCompleted: number
  averageAccuracy: number
  achievements: {
    id: string
    title: string
    description: string
    earned: boolean
  }[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LEVEL_LABEL: Record<ApiLesson["level"], string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
}

const LEVEL_COLOR: Record<ApiLesson["level"], string> = {
  BEGINNER: "bg-emerald-100 text-emerald-800",
  INTERMEDIATE: "bg-amber-100 text-amber-800",
  ADVANCED: "bg-rose-100 text-rose-800",
}

// ─── Empty / Start-Learning state ─────────────────────────────────────────────

function StartLearningState({
  language,
  onStart,
  loading,
}: {
  language: string
  onStart: () => void
  loading: boolean
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center space-y-5">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
        <Globe className="h-8 w-8 text-blue-500" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          Start your {language} journey
        </h3>
        <p className="text-sm text-gray-500 max-w-xs">
          You haven't started any lessons yet. Pick your first one and begin
          speaking {language} today.
        </p>
      </div>
      <Button onClick={onStart} disabled={loading} className="gap-2">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        Begin First Lesson
      </Button>
    </div>
  )
}

// ─── Lesson card ──────────────────────────────────────────────────────────────

function LessonCard({
  lesson,
  onAction,
  isPending,
}: {
  lesson: ApiLesson
  onAction: (id: string) => void
  isPending: boolean
}) {
  const hasProgress =
    lesson.userProgress !== null && lesson.userProgress.progress > 0
  const isCompleted = lesson.userProgress?.completed === true
  const progress = lesson.userProgress?.progress ?? 0

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-900 truncate">{lesson.title}</h3>
          {isCompleted && (
            <Badge className="bg-green-100 text-green-800 shrink-0">Done</Badge>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
          <Badge className={`${LEVEL_COLOR[lesson.level]} border-0`}>
            {LEVEL_LABEL[lesson.level]}
          </Badge>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {lesson.duration} min
          </span>
          {lesson.categories[0] && (
            <span className="text-gray-400">{lesson.categories[0].category.name}</span>
          )}
        </div>
        {hasProgress && (
          <div className="mt-2">
            <Progress value={progress} className="h-1.5" />
            <p className="text-xs text-gray-400 mt-0.5">{Math.round(progress)}% complete</p>
          </div>
        )}
      </div>

      <Button
        size="sm"
        variant={isCompleted ? "outline" : "default"}
        className="ml-4 shrink-0 gap-1"
        disabled={isPending}
        onClick={() => onAction(lesson.id)}
      >
        {isPending ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : isCompleted ? (
          <>Review</>
        ) : hasProgress ? (
          <>Continue <ChevronRight className="h-3.5 w-3.5" /></>
        ) : (
          <>Start <Play className="h-3.5 w-3.5" /></>
        )}
      </Button>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()

  const language = user?.learningLanguage ?? ""

  // Dashboard stats
  const {
    data: dashRaw,
    isLoading: dashLoading,
    isError: dashError,
  } = useQuery({
    ...dashboardControllerGetDashboardDataOptions(),
    enabled: !!user,
  })

  // Lessons filtered by the user's learning language
  const {
    data: lessonsRaw,
    isLoading: lessonsLoading,
    isError: lessonsError,
  } = useQuery({
    ...lessonControllerGetAllOptions({
      query: { language, limit: 20 },
    }),
    enabled: !!user && !!language,
  })

  // Start-lesson mutation — fires when the user clicks a lesson
  const { mutate: startLesson, isPending: startPending, variables: startingId } =
    useMutation({
      ...lessonControllerStartLessonMutation(),
      onSuccess: (_data, variables) => {
        // Invalidate lessons so progress badges refresh on next visit
        queryClient.invalidateQueries({ queryKey: ["lessonControllerGetAll"] })
        router.push(`/practice?lessonId=${variables.path.id}`)
      },
    })

  const handleLessonAction = (lessonId: string) => {
    startLesson({ path: { id: lessonId } })
  }

  // ── Data shape ──────────────────────────────────────────────────────────
  const dash = dashRaw as ApiDashboardData | undefined
  const lessonsPage = lessonsRaw as ApiLessonsResponse | undefined
  const lessons: ApiLesson[] = lessonsPage?.data ?? []

  const streak = dash?.streak ?? 0
  const stats = [
    {
      label: "Total Practice Time",
      value: dash?.totalPracticeTime ?? "—",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      label: "Lessons Completed",
      value: dash?.lessonsCompleted != null ? String(dash.lessonsCompleted) : "—",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: "Average Accuracy",
      value: dash?.averageAccuracy != null ? `${dash.averageAccuracy}%` : "—",
      icon: <Target className="h-5 w-5" />,
    },
    {
      label: "Current Streak",
      value: streak ? `${streak} days` : "—",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ]

  const achievements = dash?.achievements ?? []

  // Derive "has any started lessons" from userProgress on the fetched list
  const hasStarted = lessons.some((l) => l.userProgress !== null)

  // ── Loading / error guards ───────────────────────────────────────────────
  if (dashLoading || lessonsLoading) return <DashboardSkeleton />

  if (dashError || lessonsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-gray-600">Something went wrong loading your dashboard.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    )
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Mic className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">SpeakAI</span>
            </Link>

            <div className="hidden md:flex space-x-8">
              <a href="/dashboard" className="text-blue-600 font-medium">Dashboard</a>
              <a href="/practice"  className="text-gray-600 hover:text-gray-900">Practice</a>
              <a href="/progress"  className="text-gray-600 hover:text-gray-900">Progress</a>
              <a href="/lessons"   className="text-gray-600 hover:text-gray-900">Lessons</a>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-800"
              >
                Log out
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.firstName?.[0] ?? "U"}{user?.lastName?.[0] ?? ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Welcome back, {user?.firstName ?? "User"}!
          </h1>
          <p className="text-gray-500 flex items-center gap-1.5">
            <Globe className="h-4 w-4" />
            Learning{" "}
            <span className="font-medium text-gray-700">{language || "a language"}</span>
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Main content ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Lessons card — language-aware */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-blue-600" />
                  {hasStarted ? "Continue Learning" : `${language} Lessons`}
                </CardTitle>
                <CardDescription>
                  {hasStarted
                    ? "Pick up where you left off"
                    : `All available ${language} lessons, ready when you are`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {lessons.length === 0 ? (
                  /* No lessons exist for this language yet */
                  <StartLearningState
                    language={language}
                    onStart={() => router.push("/lessons")}
                    loading={false}
                  />
                ) : !hasStarted ? (
                  /* Lessons exist but user hasn't started any */
                  <>
                    <StartLearningState
                      language={language}
                      onStart={() =>
                        handleLessonAction(lessons[0].id)
                      }
                      loading={
                        startPending &&
                        startingId?.path.id === lessons[0].id
                      }
                    />
                    {/* Show the full list below the CTA */}
                    <div className="border-t pt-4 mt-2 space-y-3">
                      {lessons.map((lesson) => (
                        <LessonCard
                          key={lesson.id}
                          lesson={lesson}
                          onAction={handleLessonAction}
                          isPending={
                            startPending &&
                            startingId?.path.id === lesson.id
                          }
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  /* User has progress — show the full list */
                  <div className="space-y-3">
                    {lessons.map((lesson) => (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        onAction={handleLessonAction}
                        isPending={
                          startPending &&
                          startingId?.path.id === lesson.id
                        }
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Practice */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-green-600" />
                  Quick Practice
                </CardTitle>
                <CardDescription>5-minute pronunciation exercises</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <h3 className="font-medium mb-1">Daily Challenge</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Practice today's featured sounds
                    </p>
                    <Badge className="bg-orange-100 text-orange-800 border-0">5 min</Badge>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <h3 className="font-medium mb-1">Weak Spots</h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Focus on your challenging sounds
                    </p>
                    <Badge className="bg-red-100 text-red-800 border-0">10 min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* Streak */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-1">{streak}</div>
                  <p className="text-gray-500 mb-4 text-sm">days in a row</p>
                  <div className="flex justify-center gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full ${
                          i < streak ? "bg-yellow-400" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {achievements.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">
                    Complete lessons to earn your first achievement.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {achievements.map((a) => (
                      <div
                        key={a.id}
                        className={`flex items-center p-3 rounded-lg ${
                          a.earned
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0 ${
                            a.earned ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <Trophy
                            className={`h-4 w-4 ${
                              a.earned ? "text-white" : "text-gray-500"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{a.title}</h4>
                          <p className="text-xs text-gray-500">{a.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/practice">
                  <Button className="w-full justify-start gap-2">
                    <Mic className="h-4 w-4" />
                    Start Practice Session
                  </Button>
                </Link>
                <Link href="/lessons">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <BookOpen className="h-4 w-4" />
                    Browse All Lessons
                  </Button>
                </Link>
                <Link href="/progress">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <TrendingUp className="h-4 w-4" />
                    View Progress
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
