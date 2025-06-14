"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BatteryVisualization } from "@/components/battery-visualization"
import { CO2Visualization } from "@/components/co2-visualization"
import { GraphVisualization } from "@/components/graph-visualization"
import { DailyProgress } from "@/components/daily-progress"
import { Battery, Leaf, BarChart3, RotateCcw } from "lucide-react"

type VisualizationMode = "battery" | "co2" | "graph"

export default function VisualizePage() {
  const [mode, setMode] = useState<VisualizationMode>("battery")
  const [totalEnergy, setTotalEnergy] = useState(0)

  useEffect(() => {
    // Get energy data from localStorage or calculate from activities
    const savedEnergy = localStorage.getItem("wattbuster-daily-energy")
    if (savedEnergy) {
      setTotalEnergy(Number.parseInt(savedEnergy))
    } else {
      // Calculate from activities (this would come from the activities page in a real app)
      setTotalEnergy(850) // Example total
    }
  }, [])

  const visualizationModes = [
    {
      id: "battery" as const,
      name: "Battery Drain",
      icon: <Battery className="w-6 h-6" />,
      description: "See how your activities drain a virtual battery",
    },
    {
      id: "co2" as const,
      name: "CO₂ Counter",
      icon: <Leaf className="w-6 h-6" />,
      description: "Watch your carbon footprint grow in real-time",
    },
    {
      id: "graph" as const,
      name: "Energy Graph",
      icon: <BarChart3 className="w-6 h-6" />,
      description: "View your energy usage as a futuristic graph",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              WattBuster
            </h1>
          </Link>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Your Energy Impact Visualization</h2>
          <p className="text-gray-300 text-lg">Choose how you want to see your digital energy footprint</p>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {visualizationModes.map((modeOption) => (
            <Card
              key={modeOption.id}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                mode === modeOption.id
                  ? "bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border-cyan-400/50 shadow-lg shadow-cyan-500/25"
                  : "bg-white/10 border-white/20 hover:bg-white/20"
              } backdrop-blur-sm`}
              onClick={() => setMode(modeOption.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`mb-3 flex justify-center ${mode === modeOption.id ? "text-cyan-400" : "text-white"}`}>
                  {modeOption.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{modeOption.name}</h3>
                <p className="text-gray-300 text-sm">{modeOption.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Visualization */}
        <div className="mb-8">
          {mode === "battery" && <BatteryVisualization totalEnergy={totalEnergy} />}
          {mode === "co2" && <CO2Visualization totalEnergy={totalEnergy} />}
          {mode === "graph" && <GraphVisualization totalEnergy={totalEnergy} />}
        </div>

        {/* Daily Progress */}
        <DailyProgress totalEnergy={totalEnergy} />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/analytics">
            <Button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500 text-white border-0 rounded-full transition-all duration-300">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Detailed Analytics
            </Button>
          </Link>
          <Link href="/activities">
            <Button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white border-0 rounded-full transition-all duration-300">
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Different Activities
            </Button>
          </Link>
          <Button
            onClick={() => {
              localStorage.removeItem("wattbuster-daily-energy")
              window.location.reload()
            }}
            variant="outline"
            className="px-6 py-3 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20 rounded-full"
          >
            Reset Daily Progress
          </Button>
        </div>
      </div>
    </div>
  )
}
