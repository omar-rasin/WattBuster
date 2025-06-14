"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Trash2, BarChart3, Calendar } from "lucide-react"

interface DailyActivity {
  date: string
  activities: Record<string, { energy: number; hours: number }>
  totalEnergy: number
}

interface ActivityInputFormProps {
  onSubmit: (activities: DailyActivity[]) => void
}

const ACTIVITY_OPTIONS = [
  { id: "youtube", name: "YouTube", energyPerHour: 150 },
  { id: "netflix", name: "Netflix", energyPerHour: 200 },
  { id: "gaming", name: "Gaming", energyPerHour: 300 },
  { id: "social", name: "Social Media", energyPerHour: 100 },
  { id: "email", name: "Email", energyPerHour: 50 },
  { id: "videocalls", name: "Video Calls", energyPerHour: 180 },
  { id: "music", name: "Music Streaming", energyPerHour: 80 },
  { id: "shopping", name: "Online Shopping", energyPerHour: 120 },
  { id: "tiktok", name: "TikTok", energyPerHour: 140 },
  { id: "podcast", name: "Podcasts", energyPerHour: 60 },
  { id: "cloud", name: "Cloud Sync", energyPerHour: 90 },
  { id: "search", name: "Web Search", energyPerHour: 70 },
]

export function ActivityInputForm({ onSubmit }: ActivityInputFormProps) {
  const [days, setDays] = useState<
    Array<{
      date: string
      activities: Array<{ activity: string; hours: number }>
    }>
  >([
    {
      date: new Date().toISOString().split("T")[0],
      activities: [{ activity: "youtube", hours: 1 }],
    },
  ])

  const addDay = () => {
    const lastDate = new Date(days[days.length - 1]?.date || new Date())
    lastDate.setDate(lastDate.getDate() + 1)

    setDays([
      ...days,
      {
        date: lastDate.toISOString().split("T")[0],
        activities: [{ activity: "youtube", hours: 1 }],
      },
    ])
  }

  const removeDay = (dayIndex: number) => {
    if (days.length > 1) {
      setDays(days.filter((_, index) => index !== dayIndex))
    }
  }

  const updateDay = (dayIndex: number, field: "date", value: string) => {
    const newDays = [...days]
    newDays[dayIndex] = { ...newDays[dayIndex], [field]: value }
    setDays(newDays)
  }

  const addActivity = (dayIndex: number) => {
    const newDays = [...days]
    newDays[dayIndex].activities.push({ activity: "youtube", hours: 1 })
    setDays(newDays)
  }

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const newDays = [...days]
    if (newDays[dayIndex].activities.length > 1) {
      newDays[dayIndex].activities.splice(activityIndex, 1)
      setDays(newDays)
    }
  }

  const updateActivity = (
    dayIndex: number,
    activityIndex: number,
    field: "activity" | "hours",
    value: string | number,
  ) => {
    const newDays = [...days]
    newDays[dayIndex].activities[activityIndex] = {
      ...newDays[dayIndex].activities[activityIndex],
      [field]: value,
    }
    setDays(newDays)
  }

  const calculateDayTotal = (dayActivities: Array<{ activity: string; hours: number }>) => {
    return dayActivities.reduce((total, act) => {
      const activityData = ACTIVITY_OPTIONS.find((opt) => opt.id === act.activity)
      return total + (activityData?.energyPerHour || 0) * act.hours
    }, 0)
  }

  const handleSubmit = () => {
    const processedData: DailyActivity[] = days.map((day) => {
      const activities: Record<string, { energy: number; hours: number }> = {}
      let totalEnergy = 0

      day.activities.forEach((act) => {
        const activityData = ACTIVITY_OPTIONS.find((opt) => opt.id === act.activity)
        if (activityData) {
          const energy = activityData.energyPerHour * act.hours
          activities[act.activity] = { energy, hours: act.hours }
          totalEnergy += energy
        }
      })

      return {
        date: day.date,
        activities,
        totalEnergy,
      }
    })

    onSubmit(processedData)
  }

  const totalEnergyAllDays = days.reduce((total, day) => total + calculateDayTotal(day.activities), 0)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="outline" size="icon" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Enter Your Digital Activities
          </h1>
          <p className="text-gray-300">Tell us about your recent digital activities to see your energy analytics</p>
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-cyan-400">{days.length}</div>
              <div className="text-sm text-gray-300">Days to Track</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{Math.round(totalEnergyAllDays)}W</div>
              <div className="text-sm text-gray-300">Total Energy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">
                {days.length > 0 ? Math.round(totalEnergyAllDays / days.length) : 0}W
              </div>
              <div className="text-sm text-gray-300">Daily Average</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Days Input */}
      <div className="space-y-6 mb-8">
        {days.map((day, dayIndex) => (
          <Card key={dayIndex} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  Day {dayIndex + 1}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-300">Total: {Math.round(calculateDayTotal(day.activities))}W</span>
                  {days.length > 1 && (
                    <Button
                      onClick={() => removeDay(dayIndex)}
                      size="sm"
                      variant="outline"
                      className="border-red-400/50 text-red-400 hover:bg-red-400/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date Input */}
              <div>
                <Label htmlFor={`date-${dayIndex}`} className="text-white">
                  Date
                </Label>
                <Input
                  id={`date-${dayIndex}`}
                  type="date"
                  value={day.date}
                  onChange={(e) => updateDay(dayIndex, "date", e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              {/* Activities */}
              <div className="space-y-3">
                <Label className="text-white">Activities</Label>
                {day.activities.map((activity, activityIndex) => (
                  <div key={activityIndex} className="flex gap-3 items-end">
                    <div className="flex-1">
                      <Label className="text-gray-300 text-sm">Activity</Label>
                      <select
                        value={activity.activity}
                        onChange={(e) => updateActivity(dayIndex, activityIndex, "activity", e.target.value)}
                        className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
                      >
                        {ACTIVITY_OPTIONS.map((option) => (
                          <option key={option.id} value={option.id} className="bg-slate-800">
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-24">
                      <Label className="text-gray-300 text-sm">Hours</Label>
                      <Input
                        type="number"
                        min="0.1"
                        max="24"
                        step="0.1"
                        value={activity.hours}
                        onChange={(e) =>
                          updateActivity(dayIndex, activityIndex, "hours", Number.parseFloat(e.target.value) || 0)
                        }
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div className="w-20 text-center">
                      <Label className="text-gray-300 text-sm">Energy</Label>
                      <div className="text-cyan-400 font-semibold">
                        {Math.round(
                          (ACTIVITY_OPTIONS.find((opt) => opt.id === activity.activity)?.energyPerHour || 0) *
                            activity.hours,
                        )}
                        W
                      </div>
                    </div>
                    {day.activities.length > 1 && (
                      <Button
                        onClick={() => removeActivity(dayIndex, activityIndex)}
                        size="sm"
                        variant="outline"
                        className="border-red-400/50 text-red-400 hover:bg-red-400/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={() => addActivity(dayIndex)}
                  size="sm"
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={addDay}
          variant="outline"
          className="border-purple-400/50 text-purple-400 hover:bg-purple-400/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Another Day
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={days.length === 0}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          <BarChart3 className="w-5 h-5 mr-2" />
          Generate My Analytics
        </Button>
      </div>

      {/* Quick Tips */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 mt-8">
        <CardContent className="p-6">
          <h3 className="text-white font-semibold mb-3">💡 Quick Tips:</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Add at least 3-7 days of data for meaningful analytics</li>
            <li>• Be honest about your usage - this helps you understand your digital footprint</li>
            <li>• Include different types of activities for a complete picture</li>
            <li>• You can add multiple instances of the same activity per day</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
