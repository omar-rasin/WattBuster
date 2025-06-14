"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Battery, BatteryLow, Zap } from "lucide-react"

interface BatteryVisualizationProps {
  totalEnergy: number
}

export function BatteryVisualization({ totalEnergy }: BatteryVisualizationProps) {
  const [batteryLevel, setBatteryLevel] = useState(100)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    const maxEnergy = 1000 // Maximum energy for full drain
    const drainPercentage = Math.min((totalEnergy / maxEnergy) * 100, 100)
    const finalLevel = Math.max(100 - drainPercentage, 0)

    const timer = setTimeout(() => {
      setBatteryLevel(finalLevel)
    }, 500)

    return () => clearTimeout(timer)
  }, [totalEnergy])

  const getBatteryColor = () => {
    if (batteryLevel > 60) return "from-green-400 to-green-600"
    if (batteryLevel > 30) return "from-yellow-400 to-orange-500"
    return "from-red-400 to-red-600"
  }

  const getBatteryIcon = () => {
    if (batteryLevel > 20) return <Battery className="w-8 h-8" />
    return <BatteryLow className="w-8 h-8" />
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Digital Battery Drain</h3>
          <p className="text-gray-300">Watch how your digital activities drain a virtual battery</p>
        </div>

        {/* Battery Visualization */}
        <div className="relative mb-8">
          <div className="w-64 h-32 mx-auto relative">
            {/* Battery Outline */}
            <div className="w-full h-full border-4 border-white/50 rounded-lg relative">
              {/* Battery Terminal */}
              <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-white/50 rounded-r"></div>

              {/* Battery Fill */}
              <div
                className={`h-full bg-gradient-to-r ${getBatteryColor()} rounded transition-all duration-2000 ease-out`}
                style={{ width: `${batteryLevel}%` }}
              ></div>

              {/* Battery Percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white drop-shadow-lg">{Math.round(batteryLevel)}%</span>
              </div>
            </div>
          </div>

          {/* Battery Icon and Status */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className={`${batteryLevel > 20 ? "text-white" : "text-red-400"}`}>{getBatteryIcon()}</div>
            <div className="text-white">
              <div className="text-lg font-semibold">
                {batteryLevel > 60 && "Battery Healthy"}
                {batteryLevel <= 60 && batteryLevel > 30 && "Battery Draining"}
                {batteryLevel <= 30 && batteryLevel > 10 && "Low Battery"}
                {batteryLevel <= 10 && "Critical Battery"}
              </div>
              <div className="text-sm text-gray-300">
                Your digital activities consumed {Math.round(100 - batteryLevel)}% battery
              </div>
            </div>
          </div>
        </div>

        {/* Energy Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{totalEnergy}W</div>
            <div className="text-sm text-gray-300">Total Energy Used</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <Battery className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{Math.round(100 - batteryLevel)}%</div>
            <div className="text-sm text-gray-300">Battery Drained</div>
          </div>
        </div>

        {batteryLevel < 30 && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-300 font-semibold">⚠️ High Energy Usage Detected!</p>
            <p className="text-red-200 text-sm mt-1">Consider reducing your digital activities to save energy.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
