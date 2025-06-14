"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, TrendingUp, Zap } from "lucide-react"

interface GraphVisualizationProps {
  totalEnergy: number
}

export function GraphVisualization({ totalEnergy }: GraphVisualizationProps) {
  const [animatedBars, setAnimatedBars] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0])
  const [currentHour, setCurrentHour] = useState(0)

  // Sample data for different activities throughout the day
  const hourlyData = [
    { hour: "8AM", energy: totalEnergy * 0.08, activity: "Email & News" },
    { hour: "10AM", energy: totalEnergy * 0.12, activity: "Video Calls" },
    { hour: "12PM", energy: totalEnergy * 0.15, activity: "Social Media" },
    { hour: "2PM", energy: totalEnergy * 0.1, activity: "Music Streaming" },
    { hour: "4PM", energy: totalEnergy * 0.18, activity: "Online Shopping" },
    { hour: "6PM", energy: totalEnergy * 0.2, activity: "Video Streaming" },
    { hour: "8PM", energy: totalEnergy * 0.12, activity: "Gaming" },
    { hour: "10PM", energy: totalEnergy * 0.05, activity: "Podcasts" },
  ]

  useEffect(() => {
    const animateGraph = () => {
      hourlyData.forEach((_, index) => {
        setTimeout(() => {
          setCurrentHour(index)
          setAnimatedBars((prev) => {
            const newBars = [...prev]
            newBars[index] = hourlyData[index].energy
            return newBars
          })
        }, index * 500)
      })
    }

    animateGraph()
  }, [totalEnergy])

  const maxEnergy = Math.max(...hourlyData.map((d) => d.energy))

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-4xl mx-auto">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Energy Usage Graph</h3>
          <p className="text-gray-300">Your digital energy consumption throughout the day</p>
        </div>

        {/* Graph Container */}
        <div className="relative h-80 mb-8">
          {/* Grid Lines */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute w-full border-t border-cyan-400/20" style={{ top: `${i * 20}%` }}></div>
            ))}
          </div>

          {/* Y-Axis Labels */}
          <div className="absolute -left-12 inset-y-0 flex flex-col justify-between text-sm text-gray-400">
            <span>{Math.round(maxEnergy)}W</span>
            <span>{Math.round(maxEnergy * 0.75)}W</span>
            <span>{Math.round(maxEnergy * 0.5)}W</span>
            <span>{Math.round(maxEnergy * 0.25)}W</span>
            <span>0W</span>
          </div>

          {/* Bars */}
          <div className="flex items-end justify-between h-full px-2">
            {hourlyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1 mx-1">
                {/* Bar */}
                <div className="relative w-full max-w-12 mb-4">
                  <div
                    className={`w-full bg-gradient-to-t transition-all duration-1000 ease-out rounded-t-lg relative overflow-hidden ${
                      index <= currentHour
                        ? "from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/25"
                        : "from-gray-600 to-gray-700"
                    }`}
                    style={{
                      height: `${(animatedBars[index] / maxEnergy) * 100}%`,
                      minHeight: "4px",
                    }}
                  >
                    {/* Animated glow effect */}
                    {index <= currentHour && (
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 animate-pulse"></div>
                    )}
                  </div>

                  {/* Energy Value */}
                  {animatedBars[index] > 0 && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white font-semibold bg-black/50 px-2 py-1 rounded">
                      {Math.round(animatedBars[index])}W
                    </div>
                  )}
                </div>

                {/* Time Label */}
                <div className="text-sm text-gray-300 font-medium mb-1">{data.hour}</div>

                {/* Activity Label */}
                <div className="text-xs text-gray-400 text-center">{data.activity}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <BarChart3 className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{Math.round(totalEnergy)}W</div>
            <div className="text-sm text-gray-300">Total Daily Usage</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{Math.round(totalEnergy / 8)}W</div>
            <div className="text-sm text-gray-300">Average per Activity</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {hourlyData.find((d) => d.energy === Math.max(...hourlyData.map((h) => h.energy)))?.hour}
            </div>
            <div className="text-sm text-gray-300">Peak Usage Time</div>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-400/30 rounded-lg">
          <h4 className="text-lg font-semibold text-white mb-2">📊 Energy Insights</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>
              • Your peak energy usage is during{" "}
              {hourlyData
                .find((d) => d.energy === Math.max(...hourlyData.map((h) => h.energy)))
                ?.activity.toLowerCase()}
            </li>
            <li>• You could save {Math.round(totalEnergy * 0.2)}W by reducing video quality</li>
            <li>• Using dark mode could reduce your daily usage by {Math.round(totalEnergy * 0.15)}W</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
