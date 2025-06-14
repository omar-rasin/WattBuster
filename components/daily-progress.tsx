"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingDown, Award } from "lucide-react"

interface DailyProgressProps {
  totalEnergy: number
}

export function DailyProgress({ totalEnergy }: DailyProgressProps) {
  const [progress, setProgress] = useState(0)
  const [dailyGoal] = useState(500) // 500W daily goal
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    // Save today's energy usage
    const today = new Date().toDateString()
    const savedData = localStorage.getItem("wattbuster-daily-data")
    const dailyData = savedData ? JSON.parse(savedData) : {}

    dailyData[today] = totalEnergy
    localStorage.setItem("wattbuster-daily-data", JSON.stringify(dailyData))

    // Calculate progress
    const progressPercentage = Math.min((totalEnergy / dailyGoal) * 100, 100)
    setProgress(progressPercentage)

    // Calculate streak (days under goal)
    const dates = Object.keys(dailyData).sort().reverse()
    let currentStreak = 0
    for (const date of dates) {
      if (dailyData[date] <= dailyGoal) {
        currentStreak++
      } else {
        break
      }
    }
    setStreak(currentStreak)
  }, [totalEnergy, dailyGoal])

  const getProgressColor = () => {
    if (progress <= 60) return "bg-green-500"
    if (progress <= 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getProgressMessage = () => {
    if (progress <= 60) return { message: "Great job! You're being energy efficient! 🌱", color: "text-green-400" }
    if (progress <= 80)
      return { message: "Good progress, but there's room for improvement! ⚡", color: "text-yellow-400" }
    if (progress <= 100)
      return { message: "You've reached your daily limit. Try to reduce tomorrow! ⚠️", color: "text-orange-400" }
    return { message: "High energy usage detected! Time to go green! 🚨", color: "text-red-400" }
  }

  const progressMessage = getProgressMessage()

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Daily Energy Progress</h3>
          <p className="text-gray-300 text-sm">Track your daily digital energy consumption</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Energy Used</span>
            <span className="text-sm text-white font-semibold">
              {Math.round(totalEnergy)}W / {dailyGoal}W
            </span>
          </div>

          <div className="relative">
            <Progress value={progress} className="h-4 bg-gray-700" />
            <div
              className={`absolute top-0 left-0 h-4 rounded-full transition-all duration-1000 ${getProgressColor()}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>

          <div className="text-center mt-3">
            <p className={`text-sm font-medium ${progressMessage.color}`}>{progressMessage.message}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="bg-white/5 rounded-lg p-3 mb-2">
              <Target className="w-6 h-6 text-cyan-400 mx-auto" />
            </div>
            <div className="text-lg font-bold text-white">{Math.round(progress)}%</div>
            <div className="text-xs text-gray-300">of Daily Goal</div>
          </div>

          <div className="text-center">
            <div className="bg-white/5 rounded-lg p-3 mb-2">
              <TrendingDown className="w-6 h-6 text-green-400 mx-auto" />
            </div>
            <div className="text-lg font-bold text-white">{Math.max(0, dailyGoal - totalEnergy)}W</div>
            <div className="text-xs text-gray-300">Remaining Budget</div>
          </div>

          <div className="text-center">
            <div className="bg-white/5 rounded-lg p-3 mb-2">
              <Award className="w-6 h-6 text-purple-400 mx-auto" />
            </div>
            <div className="text-lg font-bold text-white">{streak}</div>
            <div className="text-xs text-gray-300">Day Streak</div>
          </div>
        </div>

        {/* Achievement Badge */}
        {streak >= 3 && (
          <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg text-center">
            <Award className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
            <p className="text-yellow-400 font-semibold text-sm">🏆 Energy Saver Streak: {streak} days!</p>
          </div>
        )}

        {progress > 100 && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-center">
            <p className="text-red-300 font-semibold text-sm">💡 Try to Reduce Tomorrow!</p>
            <p className="text-red-200 text-xs mt-1">Small changes can make a big difference for our planet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
