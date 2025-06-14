"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EnergyTrendChart } from "@/components/energy-trend-chart"
import { ActivityBreakdown } from "@/components/activity-breakdown"
import { WeeklyComparison } from "@/components/weekly-comparison"
import { EnergyInsights } from "@/components/energy-insights"
import { ActivityInputForm } from "@/components/activity-input-form"
import { BarChart3, TrendingUp, Calendar, Zap, ArrowLeft } from "lucide-react"

interface DailyActivity {
  date: string
  activities: Record<string, { energy: number; hours: number }>
  totalEnergy: number
}

export default function AnalyticsPage() {
  const [userActivities, setUserActivities] = useState<DailyActivity[]>([])
  const [showInputForm, setShowInputForm] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<"7d" | "30d">("7d")

  const handleActivitiesSubmit = (activities: DailyActivity[]) => {
    setUserActivities(activities)
    setShowInputForm(false)
  }

  const handleStartOver = () => {
    setUserActivities([])
    setShowInputForm(true)
  }

  const getPeriodData = () => {
    const days = selectedPeriod === "7d" ? 7 : 30
    return userActivities.slice(-days)
  }

  const periodData = getPeriodData()

  if (showInputForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black">
        <ActivityInputForm onSubmit={handleActivitiesSubmit} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <Link href="/" className="inline-block mb-2">
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  WattBuster Analytics
                </h1>
              </Link>
              <p className="text-gray-300">Your personal digital energy consumption insights</p>
            </div>
          </div>
          <Button
            onClick={handleStartOver}
            variant="outline"
            className="border-purple-400/50 text-purple-400 hover:bg-purple-400/20"
          >
            Enter New Data
          </Button>
        </div>

        {/* Period Filter */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setSelectedPeriod("7d")}
            variant={selectedPeriod === "7d" ? "default" : "outline"}
            className={`${
              selectedPeriod === "7d"
                ? "bg-cyan-500 hover:bg-cyan-400 text-white"
                : "border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20"
            }`}
          >
            Last 7 Days
          </Button>
          <Button
            onClick={() => setSelectedPeriod("30d")}
            variant={selectedPeriod === "30d" ? "default" : "outline"}
            className={`${
              selectedPeriod === "30d"
                ? "bg-cyan-500 hover:bg-cyan-400 text-white"
                : "border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20"
            }`}
          >
            All Data ({userActivities.length} days)
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {Math.round(periodData.reduce((sum, day) => sum + day.totalEnergy, 0))}W
              </div>
              <div className="text-sm text-gray-300">Total Energy Used</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {periodData.length > 0
                  ? Math.round(periodData.reduce((sum, day) => sum + day.totalEnergy, 0) / periodData.length)
                  : 0}
                W
              </div>
              <div className="text-sm text-gray-300">Daily Average</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {(() => {
                  if (periodData.length < 6) return "N/A"
                  const recent = periodData.slice(-3).reduce((sum, day) => sum + day.totalEnergy, 0) / 3
                  const previous = periodData.slice(-6, -3).reduce((sum, day) => sum + day.totalEnergy, 0) / 3
                  const change = ((recent - previous) / previous) * 100
                  return `${change > 0 ? "+" : ""}${Math.round(change)}%`
                })()}
              </div>
              <div className="text-sm text-gray-300">Recent Trend</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{periodData.length}</div>
              <div className="text-sm text-gray-300">Days Tracked</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Energy Trend Chart */}
          <EnergyTrendChart data={periodData} selectedActivity="all" />

          {/* Activity Breakdown */}
          <ActivityBreakdown data={periodData} />
        </div>

        {/* Weekly Comparison */}
        <div className="mb-8">
          <WeeklyComparison data={periodData} />
        </div>

        {/* Energy Insights */}
        <EnergyInsights data={periodData} />
      </div>
    </div>
  )
}
