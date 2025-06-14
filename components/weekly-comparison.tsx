"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calendar } from "lucide-react"

interface WeeklyComparisonProps {
  data: any[]
}

export function WeeklyComparison({ data }: WeeklyComparisonProps) {
  // Add data validation
  if (!data || data.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="w-5 h-5 text-purple-400" />
            Weekly Energy Patterns
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <div className="text-gray-400">No weekly data available</div>
        </CardContent>
      </Card>
    )
  }

  // Group data by day of week
  const weeklyData = data.reduce(
    (acc, day) => {
      if (!day || !day.date || typeof day.totalEnergy !== "number") return acc

      const date = new Date(day.date)
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" })

      if (!acc[dayOfWeek]) {
        acc[dayOfWeek] = { total: 0, count: 0 }
      }

      acc[dayOfWeek].total += day.totalEnergy
      acc[dayOfWeek].count += 1

      return acc
    },
    {} as Record<string, { total: number; count: number }>,
  )

  const chartData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => ({
    day,
    energy: weeklyData[day] ? Math.round(weeklyData[day].total / weeklyData[day].count) : 0,
    sessions: weeklyData[day]?.count || 0,
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-purple-400/50 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`${label}`}</p>
          <p className="text-purple-400">{`Avg Energy: ${payload[0].value}W`}</p>
          <p className="text-cyan-400">{`Days Tracked: ${payload[0].payload.sessions}`}</p>
        </div>
      )
    }
    return null
  }

  const highestDay = chartData.reduce((max, day) => (day.energy > max.energy ? day : max), chartData[0])
  const lowestDay = chartData.reduce(
    (min, day) => (day.energy < min.energy && day.energy > 0 ? day : min),
    chartData[0],
  )

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calendar className="w-5 h-5 text-purple-400" />
          Weekly Energy Patterns
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                label={{
                  value: "Avg Watts",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#9CA3AF" },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="energy" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
            <h4 className="text-green-400 font-semibold mb-2">🌱 Most Efficient Day</h4>
            <p className="text-white text-lg font-bold">{lowestDay.day}</p>
            <p className="text-green-300 text-sm">{lowestDay.energy}W average</p>
          </div>

          <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-lg">
            <h4 className="text-red-400 font-semibold mb-2">⚡ Highest Usage Day</h4>
            <p className="text-white text-lg font-bold">{highestDay.day}</p>
            <p className="text-red-300 text-sm">{highestDay.energy}W average</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-purple-500/10 border border-purple-400/30 rounded-lg">
          <p className="text-purple-300 text-sm">
            📊 <strong>Weekly Pattern:</strong> {(() => {
              const weekendAvg = (chartData[5].energy + chartData[6].energy) / 2 // Sat + Sun
              const weekdayAvg = chartData.slice(0, 5).reduce((sum, day) => sum + day.energy, 0) / 5

              if (weekendAvg > weekdayAvg * 1.2) {
                return "You use significantly more energy on weekends. Consider setting weekend limits!"
              } else if (weekdayAvg > weekendAvg * 1.2) {
                return "Your weekday usage is higher than weekends. Work-related activities might be energy-intensive."
              } else {
                return "Your energy usage is fairly consistent throughout the week. Great balance!"
              }
            })()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
