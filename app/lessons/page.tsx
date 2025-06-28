"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Play, Clock, Star, Users, ArrowLeft, Mic, BookOpen, Globe } from "lucide-react"
import Link from "next/link"

export default function LessonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  const lessons = [
    {
      id: 1,
      title: "English Vowel Sounds",
      description: "Master the 12 English vowel sounds with interactive exercises",
      language: "English",
      level: "Beginner",
      duration: "15 min",
      rating: 4.8,
      students: 1234,
      progress: 85,
      thumbnail: "🗣️",
    },
    {
      id: 2,
      title: "Spanish Rolling R",
      description: "Learn to roll your R's like a native Spanish speaker",
      language: "Spanish",
      level: "Intermediate",
      duration: "20 min",
      rating: 4.9,
      students: 892,
      progress: 60,
      thumbnail: "🇪🇸",
    },
    {
      id: 3,
      title: "French Nasal Sounds",
      description: "Perfect your French nasal vowels and consonants",
      language: "French",
      level: "Advanced",
      duration: "25 min",
      rating: 4.7,
      students: 567,
      progress: 40,
      thumbnail: "🇫🇷",
    },
    {
      id: 4,
      title: "English Consonant Clusters",
      description: "Practice difficult consonant combinations",
      language: "English",
      level: "Intermediate",
      duration: "18 min",
      rating: 4.6,
      students: 1089,
      progress: 0,
      thumbnail: "📚",
    },
    {
      id: 5,
      title: "German Umlauts",
      description: "Master the unique German vowel sounds",
      language: "German",
      level: "Beginner",
      duration: "12 min",
      rating: 4.5,
      students: 445,
      progress: 0,
      thumbnail: "🇩🇪",
    },
    {
      id: 6,
      title: "Mandarin Tones",
      description: "Learn the four tones of Mandarin Chinese",
      language: "Chinese",
      level: "Beginner",
      duration: "30 min",
      rating: 4.8,
      students: 778,
      progress: 0,
      thumbnail: "🇨🇳",
    },
  ]

  const languages = ["all", "English", "Spanish", "French", "German", "Chinese"]
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLanguage = selectedLanguage === "all" || lesson.language === selectedLanguage
    const matchesLevel = selectedLevel === "all" || lesson.level === selectedLevel

    return matchesSearch && matchesLanguage && matchesLevel
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
            <nav className="hidden md:flex space-x-8">
              <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </a>
              <a href="/practice" className="text-gray-600 hover:text-gray-900">
                Practice
              </a>
              <a href="/progress" className="text-gray-600 hover:text-gray-900">
                Progress
              </a>
              <a href="/lessons" className="text-blue-600 font-medium">
                Lessons
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pronunciation Lessons</h1>
          <p className="text-gray-600">Explore our comprehensive library of pronunciation lessons</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang === "all" ? "All Languages" : lang}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level === "all" ? "All Levels" : level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2">{lesson.thumbnail}</div>
                  <Badge className={getLevelColor(lesson.level)}>{lesson.level}</Badge>
                </div>
                <CardTitle className="text-lg">{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Lesson Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      {lesson.language}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {lesson.duration}
                    </div>
                  </div>

                  {/* Rating and Students */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{lesson.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{lesson.students.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Progress Bar (if started) */}
                  {lesson.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span>{lesson.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${lesson.progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Link href="/practice">
                    <Button className="w-full">
                      {lesson.progress > 0 ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Start Lesson
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
