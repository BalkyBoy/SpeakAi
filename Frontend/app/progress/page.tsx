"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Target, Award, Clock, Mic, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const weeklyData = [
    { day: "Mon", accuracy: 78, time: 15 },
    { day: "Tue", accuracy: 82, time: 20 },
    { day: "Wed", accuracy: 85, time: 18 },
    { day: "Thu", accuracy: 88, time: 25 },
    { day: "Fri", accuracy: 91, time: 22 },
    { day: "Sat", accuracy: 89, time: 30 },
    { day: "Sun", accuracy: 93, time: 28 },
  ]

  const languageProgress = [
    { language: "English", level: "Intermediate", progress: 68, lessons: 42, accuracy: 87 },
    { language: "Spanish", level: "Beginner", progress: 34, lessons: 18, accuracy: 79 },
    { language: "French", level: "Beginner", progress: 12, lessons: 6, accuracy: 72 },
  ]

  const recentAchievements = [
    { title: "Week Warrior", description: "7 days practice streak", date: "2 days ago", type: "streak" },
    { title: "Accuracy Master", description: "90%+ accuracy in session", date: "3 days ago", type: "accuracy" },
    { title: "Time Keeper", description: "30 minutes practice time", date: "5 days ago", type: "time" },
    { title: "First Steps", description: "Completed first lesson", date: "1 week ago", type: "milestone" },
  ]

  const skillAreas = [
    { skill: "Vowel Sounds", progress: 85, trend: "+5%" },
    { skill: "Consonant Clusters", progress: 72, trend: "+8%" },
    { skill: "Word Stress", progress: 68, trend: "+3%" },
    { skill: "Intonation", progress: 45, trend: "+12%" },
    { skill: "Connected Speech", progress: 38, trend: "+6%" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/dashboard" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Mic className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">SpeakAI</span>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Progress</h1>
          <p className="text-gray-600">Track your pronunciation improvement over time</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Practice Time</p>
                  <p className="text-2xl font-bold text-gray-900">47h 32m</p>
                  <p className="text-xs text-green-600">+2h 15m this week</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Average Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900">87%</p>
                  <p className="text-xs text-green-600">+5% improvement</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Lessons Completed</p>
                  <p className="text-2xl font-bold text-gray-900">66</p>
                  <p className="text-xs text-green-600">+8 this week</p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Streak</p>
                  <p className="text-2xl font-bold text-gray-900">12 days</p>
                  <p className="text-xs text-green-600">Personal best!</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Weekly Progress Chart */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Weekly Progress</CardTitle>
                    <CardDescription>Your accuracy and practice time this week</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Week
                    </Button>
                    <Button variant="ghost" size="sm">
                      Month
                    </Button>
                    <Button variant="ghost" size="sm">
                      Year
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-sm text-gray-600">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Accuracy</span>
                          <span>{day.accuracy}%</span>
                        </div>
                        <Progress value={day.accuracy} className="h-2" />
                      </div>
                      <div className="w-16 text-sm text-gray-600 text-right">{day.time}min</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest practice sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">English Vowel Sounds</h4>
                      <p className="text-sm text-gray-600">Completed • 92% accuracy</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Today</p>
                      <p className="text-sm font-medium">15 min</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Spanish Rolling R</h4>
                      <p className="text-sm text-gray-600">In Progress • 78% accuracy</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Yesterday</p>
                      <p className="text-sm font-medium">20 min</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">French Nasal Sounds</h4>
                      <p className="text-sm text-gray-600">Completed • 85% accuracy</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">2 days ago</p>
                      <p className="text-sm font-medium">25 min</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="languages" className="space-y-6">
            <div className="grid gap-6">
              {languageProgress.map((lang, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <span>{lang.language}</span>
                          <Badge variant="secondary">{lang.level}</Badge>
                        </CardTitle>
                        <CardDescription>{lang.lessons} lessons completed</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{lang.accuracy}%</p>
                        <p className="text-sm text-gray-600">avg. accuracy</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{lang.progress}%</span>
                      </div>
                      <Progress value={lang.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Breakdown</CardTitle>
                <CardDescription>Your progress in different pronunciation areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillAreas.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.skill}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-green-600">{skill.trend}</span>
                          <span className="font-medium">{skill.progress}%</span>
                        </div>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {recentAchievements.map((achievement, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Award className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
