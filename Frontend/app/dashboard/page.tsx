"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Mic, Play, Trophy, Clock, Target, TrendingUp, BookOpen, Award, Calendar } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [currentStreak, setCurrentStreak] = useState(7)

  const recentLessons = [
    { id: 1, title: "English Vowel Sounds", progress: 85, difficulty: "Beginner", duration: "15 min" },
    { id: 2, title: "Spanish Rolling R", progress: 60, difficulty: "Intermediate", duration: "20 min" },
    { id: 3, title: "French Nasal Sounds", progress: 40, difficulty: "Advanced", duration: "25 min" },
  ]

  const achievements = [
    { id: 1, title: "First Steps", description: "Complete your first lesson", earned: true },
    { id: 2, title: "Week Warrior", description: "Practice for 7 days straight", earned: true },
    { id: 3, title: "Pronunciation Pro", description: "Achieve 90% accuracy", earned: false },
    { id: 4, title: "Polyglot", description: "Practice 3 different languages", earned: false },
  ]

  const stats = [
    { label: "Total Practice Time", value: "24h 30m", icon: <Clock className="h-5 w-5" /> },
    { label: "Lessons Completed", value: "42", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Average Accuracy", value: "87%", icon: <Target className="h-5 w-5" /> },
    { label: "Current Streak", value: `${currentStreak} days`, icon: <TrendingUp className="h-5 w-5" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href={'/'} className="flex items-center">
              <Mic className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">SpeakAI</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <a href="/dashboard" className="text-blue-600 font-medium">
                Dashboard
              </a>
              <a href="/practice" className="text-gray-600 hover:text-gray-900">
                Practice
              </a>
              <a href="/progress" className="text-gray-600 hover:text-gray-900">
                Progress
              </a>
              <a href="/lessons" className="text-gray-600 hover:text-gray-900">
                Lessons
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Ready to continue your pronunciation journey?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2 text-blue-600" />
                  Continue Learning
                </CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{lesson.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <Badge variant="secondary">{lesson.difficulty}</Badge>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {lesson.duration}
                          </span>
                        </div>
                        <div className="mt-2">
                          <Progress value={lesson.progress} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">{lesson.progress}% complete</p>
                        </div>
                      </div>
                      <Link href="/practice">
                        <Button size="sm" className="ml-4">
                          Continue
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Practice */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mic className="h-5 w-5 mr-2 text-green-600" />
                  Quick Practice
                </CardTitle>
                <CardDescription>5-minute pronunciation exercises</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-medium mb-2">Daily Challenge</h3>
                    <p className="text-sm text-gray-600 mb-3">Practice today's featured sounds</p>
                    <Badge className="bg-orange-100 text-orange-800">5 min</Badge>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <h3 className="font-medium mb-2">Weak Spots</h3>
                    <p className="text-sm text-gray-600 mb-3">Focus on your challenging sounds</p>
                    <Badge className="bg-red-100 text-red-800">10 min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak Counter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">{currentStreak}</div>
                  <p className="text-gray-600 mb-4">days in a row</p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full ${i < currentStreak ? "bg-yellow-400" : "bg-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-purple-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`flex items-center p-3 rounded-lg ${
                        achievement.earned ? "bg-green-50 border border-green-200" : "bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          achievement.earned ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <Trophy className={`h-4 w-4 ${achievement.earned ? "text-white" : "text-gray-500"}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{achievement.title}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/practice">
                  <Button className="w-full justify-start">
                    <Mic className="h-4 w-4 mr-2" />
                    Start Practice Session
                  </Button>
                </Link>
                <Link href="/lessons">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Lessons
                  </Button>
                </Link>
                <Link href="/progress">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
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
