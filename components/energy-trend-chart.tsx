"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

interface EnergyTrendChartProps {
  data: any[]
  selectedActivity: string
}

export function EnergyTrendChart({ data, selectedActivity }: EnergyTrendChartProps) {
  // Add data validation
  if (!data || data.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Energy Consumption Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center">
          <div className="text-gray-400">No data available for the selected period</div>
        </CardContent>
      </Card>
    )
  }

  const chartData = data
    .map((day) => {
      if (!day || !day.date) return null

      const date = new Date(day.date)
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`

      if (selectedActivity === "all") {
        return {
          date: formattedDate,
          energy: day.totalEnergy || 0,
          fullDate: day.date,
        }
      } else {
        return {
          date: formattedDate,
          energy: day.activities?.[selectedActivity]?.energy || 0,
          fullDate: day.date,
        }
      }
    })
    .filter(Boolean) // Remove null entries

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-cyan-400/50 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`Date: ${label}`}</p>
          <p className="text-cyan-400">{`Energy: ${Math.round(payload[0].value)}W`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          Energy Consumption Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
              <YAxis
                stroke="#9CA3AF"
                fontSize={12}
                label={{
                  value: "Watts",
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle", fill: "#9CA3AF" },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="energy"
                stroke="#06B6D4"
                strokeWidth={3}
                dot={{ fill: "#06B6D4", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#06B6D4", strokeWidth: 2, fill: "#0891B2" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-400/30 rounded-lg">
          <p className="text-cyan-300 text-sm">
            📈 <strong>Trend Analysis:</strong> {(() => {
              const recent = chartData.slice(-3).reduce((sum, day) => sum + day.energy, 0) / 3
              const previous = chartData.slice(-6, -3).reduce((sum, day) => sum + day.energy, 0) / 3
              const change = ((recent - previous) / previous) * 100

              if (change > 10)
                return "Your energy usage is increasing significantly. Consider reducing high-energy activities."
              if (change > 0) return "Your energy usage is slightly increasing. Keep monitoring your habits."
              if (change < -10) return "Great job! Your energy usage is decreasing significantly."
              return "Your energy usage is relatively stable. Good consistency!"
            })()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
