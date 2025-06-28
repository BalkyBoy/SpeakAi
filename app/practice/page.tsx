"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Pause, RotateCcw, Volume2, CheckCircle, XCircle, ArrowLeft, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

export default function PracticePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentWord, setCurrentWord] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)

  const words = [
    {
      word: "pronunciation",
      phonetic: "/prəˌnʌnsiˈeɪʃən/",
      difficulty: "Advanced",
      tips: "Break it down: pro-nun-ci-a-tion. Stress on the 4th syllable.",
    },
    {
      word: "through",
      phonetic: "/θruː/",
      difficulty: "Intermediate",
      tips: "The 'th' sound is voiceless. Put your tongue between your teeth.",
    },
    {
      word: "comfortable",
      phonetic: "/ˈkʌmftəbəl/",
      difficulty: "Intermediate",
      tips: "Often pronounced as 'comf-ter-ble' in casual speech.",
    },
    {
      word: "schedule",
      phonetic: "/ˈʃedjuːl/",
      difficulty: "Beginner",
      tips: "British pronunciation. American version is /ˈskedʒuːl/.",
    },
  ]

  const currentWordData = words[currentWord]

  const handleRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      setAttempts((prev) => prev + 1)

      // Simulate AI analysis
      setTimeout(() => {
        const randomAccuracy = Math.floor(Math.random() * 40) + 60 // 60-100%
        setAccuracy(randomAccuracy)

        if (randomAccuracy >= 85) {
          setFeedback("Excellent pronunciation! You nailed it!")
        } else if (randomAccuracy >= 70) {
          setFeedback("Good job! Try to emphasize the stressed syllables more.")
        } else {
          setFeedback("Keep practicing! Focus on the phonetic guide and try again.")
        }

        setShowFeedback(true)
      }, 1500)
    } else {
      // Start recording
      setIsRecording(true)
      setShowFeedback(false)
    }
  }

  const handlePlayExample = () => {
    setIsPlaying(true)
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false)
    }, 2000)
  }

  const nextWord = () => {
    if (currentWord < words.length - 1) {
      setCurrentWord((prev) => prev + 1)
      setAccuracy(0)
      setAttempts(0)
      setShowFeedback(false)
    }
  }

  const prevWord = () => {
    if (currentWord > 0) {
      setCurrentWord((prev) => prev - 1)
      setAccuracy(0)
      setAttempts(0)
      setShowFeedback(false)
    }
  }

  const resetPractice = () => {
    setAccuracy(0)
    setAttempts(0)
    setShowFeedback(false)
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
            <div className="flex items-center space-x-4">
              <Badge variant="outline">Lesson 1 of 4</Badge>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Pronunciation Practice</h1>
            <span className="text-sm text-gray-600">
              {currentWord + 1} of {words.length}
            </span>
          </div>
          <Progress value={((currentWord + 1) / words.length) * 100} className="h-2" />
        </div>

        {/* Main Practice Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Practice Card */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <div className="flex justify-center items-center space-x-2 mb-4">
                  <Badge
                    variant={
                      currentWordData.difficulty === "Beginner"
                        ? "default"
                        : currentWordData.difficulty === "Intermediate"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {currentWordData.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-4xl font-bold text-gray-900 mb-2">{currentWordData.word}</CardTitle>
                <CardDescription className="text-xl text-gray-600">{currentWordData.phonetic}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                {/* Audio Controls */}
                <div className="flex justify-center space-x-4 mb-8">
                  <Button variant="outline" size="lg" onClick={handlePlayExample} disabled={isPlaying}>
                    {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Volume2 className="h-5 w-5 mr-2" />}
                    {isPlaying ? "Playing..." : "Listen"}
                  </Button>
                  <Button variant="outline" size="lg" onClick={resetPractice}>
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Recording Button */}
                <div className="mb-8">
                  <Button
                    size="lg"
                    onClick={handleRecord}
                    className={`w-32 h-32 rounded-full ${
                      isRecording ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isRecording ? <MicOff className="h-12 w-12" /> : <Mic className="h-12 w-12" />}
                  </Button>
                  <p className="text-sm text-gray-600 mt-4">
                    {isRecording ? "Recording... Click to stop" : "Click to start recording"}
                  </p>
                </div>

                {/* Feedback */}
                {showFeedback && (
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-4">
                      {accuracy >= 85 ? (
                        <CheckCircle className="h-8 w-8 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-8 w-8 text-orange-500 mr-2" />
                      )}
                      <span className="text-2xl font-bold">{accuracy}% Accuracy</span>
                    </div>
                    <p className="text-gray-700 mb-4">{feedback}</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Tip:</strong> {currentWordData.tips}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center">
                  <Button variant="outline" onClick={prevWord} disabled={currentWord === 0}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">Attempts: {attempts}</span>
                  <Button onClick={nextWord} disabled={currentWord === words.length - 1}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Words Practiced</span>
                    <span className="font-medium">{currentWord + 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Attempts</span>
                    <span className="font-medium">{attempts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Score</span>
                    <span className="font-medium">{accuracy}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Word List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Words</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {words.map((word, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        index === currentWord ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setCurrentWord(index)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{word.word}</span>
                        {index < currentWord && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>
                      <p className="text-xs text-gray-600">{word.phonetic}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Practice Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Listen to the example pronunciation first</li>
                  <li>• Speak clearly and at normal pace</li>
                  <li>• Focus on stressed syllables</li>
                  <li>• Practice in a quiet environment</li>
                  <li>• Don't worry about accent - focus on clarity</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
