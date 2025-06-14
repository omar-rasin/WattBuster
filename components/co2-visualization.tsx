"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, TreePine, Factory } from "lucide-react"

interface CO2VisualizationProps {
  totalEnergy: number
}

export function CO2Visualization({ totalEnergy }: CO2VisualizationProps) {
  const [co2Amount, setCo2Amount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
    // Convert watts to CO2 (approximate: 1kWh = 0.5kg CO2)
    const co2InGrams = (totalEnergy / 1000) * 500

    let current = 0
    const increment = co2InGrams / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= co2InGrams) {
        setCo2Amount(co2InGrams)
        clearInterval(timer)
      } else {
        setCo2Amount(current)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [totalEnergy])

  const getImpactLevel = () => {
    if (co2Amount < 100) return { level: "Low", color: "text-green-400", icon: <Leaf className="w-8 h-8" /> }
    if (co2Amount < 300) return { level: "Medium", color: "text-yellow-400", icon: <TreePine className="w-8 h-8" /> }
    return { level: "High", color: "text-red-400", icon: <Factory className="w-8 h-8" /> }
  }

  const impact = getImpactLevel()

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">CO₂ Footprint Counter</h3>
          <p className="text-gray-300">See the carbon emissions from your digital activities</p>
        </div>

        {/* CO2 Counter */}
        <div className="mb-8">
          <div className="relative">
            {/* Animated CO2 Molecules */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gray-400 rounded-full opacity-30 animate-float"
                  style={{
                    left: `${20 + i * 15}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i * 0.5}s`,
                  }}
                ></div>
              ))}
            </div>

            {/* Main Counter */}
            <div className="relative z-10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-600/30">
              <div className={`mb-4 flex justify-center ${impact.color}`}>{impact.icon}</div>

              <div className="text-5xl font-bold text-white mb-2 font-mono">{Math.round(co2Amount)}</div>
              <div className="text-xl text-gray-300 mb-4">grams of CO₂</div>

              <div className={`text-lg font-semibold ${impact.color}`}>{impact.level} Impact</div>
            </div>
          </div>
        </div>

        {/* Comparison Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4">
            <TreePine className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{Math.round(co2Amount / 22)} trees</div>
            <div className="text-sm text-gray-300">needed to offset this CO₂</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <Factory className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{Math.round(co2Amount / 404)} miles</div>
            <div className="text-sm text-gray-300">equivalent car driving</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <Leaf className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-white">{Math.round(totalEnergy)} watts</div>
            <div className="text-sm text-gray-300">total energy consumed</div>
          </div>
        </div>

        {co2Amount > 200 && (
          <div className="p-4 bg-orange-500/20 border border-orange-500/50 rounded-lg">
            <p className="text-orange-300 font-semibold">🌱 Consider These Eco-Friendly Tips:</p>
            <ul className="text-orange-200 text-sm mt-2 space-y-1">
              <li>• Use dark mode to reduce screen energy</li>
              <li>• Turn off video in calls when not needed</li>
              <li>• Download music/podcasts for offline listening</li>
              <li>• Close unused browser tabs and apps</li>
              <li>• Use WiFi instead of mobile data</li>
              <li>• Set time limits for social media apps</li>
              <li>• Make shopping lists to reduce browsing time</li>
              <li>• Use audio-only content when possible</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
