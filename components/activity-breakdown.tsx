"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { PieChartIcon } from "lucide-react"

interface ActivityBreakdownProps {
  data: any[]
}

export function ActivityBreakdown({ data }: ActivityBreakdownProps) {
  // Add data validation
  if (!data || data.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <PieChartIcon className="w-5 h-5 text-purple-400" />
            Activity Energy Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <div className="text-gray-400">No activity data available</div>
        </CardContent>
      </Card>
    )
  }

  // Aggregate energy by activity across all days
  const activityTotals: Record<string, number> = {}

  data.forEach((day) => {
    if (day && day.activities) {
      Object.entries(day.activities).forEach(([activity, data]: [string, any]) => {
        if (data && typeof data.energy === "number") {
          activityTotals[activity] = (activityTotals[activity] || 0) + data.energy
        }
      })
    }
  })

  const activityNames: Record<string, string> = {
    youtube: "YouTube",
    netflix: "Netflix",
    gaming: "Gaming",
    social: "Social Media",
    email: "Email",
    videocalls: "Video Calls",
    music: "Music Streaming",
    shopping: "Online Shopping",
    tiktok: "TikTok",
    podcast: "Podcasts",
    cloud: "Cloud Sync",
    search: "Web Search",
  }

  const chartData = Object.entries(activityTotals)
    .map(([activity, energy]) => ({
      name: activityNames[activity] || activity,
      value: Math.round(energy),
      percentage: 0,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8) // Top 8 activities

  const total = chartData.reduce((sum, item) => sum + item.value, 0)
  chartData.forEach((item) => {
    item.percentage = Math.round((item.value / total) * 100)
  })

  const COLORS = ["#06B6D4", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#EF4444", "#6366F1", "#84CC16"]

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-slate-800 border border-cyan-400/50 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-cyan-400">{`Energy: ${data.value}W`}</p>
          <p className="text-purple-400">{`Share: ${data.percentage}%`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <PieChartIcon className="w-5 h-5 text-purple-400" />
          Activity Energy Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Activities List */}
        <div className="mt-4 space-y-2">
          <h4 className="text-white font-semibold mb-3">Top Energy Consumers:</h4>
          {chartData.slice(0, 5).map((activity, index) => (
            <div key={activity.name} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-white text-sm">{activity.name}</span>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{activity.value}W</div>
                <div className="text-gray-400 text-xs">{activity.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
