"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap, Sparkles, BarChart3 } from "lucide-react"

export default function HomePage() {
  const [animatedText, setAnimatedText] = useState("")
  const fullText = "Did You Know Your Digital Life Uses Energy?"

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setAnimatedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* WattBuster Logo */}
        <div className="mb-8 relative">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            WattBuster
          </h1>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-xl rounded-lg"></div>
          <Zap className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-bounce" />
          <Sparkles className="absolute -bottom-2 -left-2 w-6 h-6 text-cyan-400 animate-spin" />
        </div>

        {/* Animated Headline */}
        <div className="mb-12 max-w-4xl">
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 min-h-[3rem] flex items-center justify-center">
            {animatedText}
            <span className="animate-pulse text-cyan-400 ml-2">|</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 opacity-80">
            Discover the hidden energy cost of your digital activities and learn how to reduce your digital footprint!
          </p>
        </div>

        {/* Call to Action Button */}
        <Link href="/activities">
          <Button className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-5 h-5 group-hover:animate-spin" />
              Discover Your Invisible Energy!
              <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          </Button>
        </Link>

        {/* Analytics Link */}
        <div className="mt-8">
          <Link href="/analytics">
            <Button
              variant="outline"
              className="px-6 py-3 border-purple-400/50 text-purple-400 hover:bg-purple-400/20 rounded-full transition-all duration-300"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              View Analytics
            </Button>
          </Link>
        </div>

        {/* Fun Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="text-3xl font-bold text-cyan-400 mb-2">4.6%</div>
            <div className="text-white text-sm">of global electricity is used by the internet</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="text-3xl font-bold text-purple-400 mb-2">1hr</div>
            <div className="text-white text-sm">of video calls = 150-1000MB of data</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="text-3xl font-bold text-pink-400 mb-2">65</div>
            <div className="text-white text-sm">emails = 1 mile driven in a car</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="text-3xl font-bold text-yellow-400 mb-2">8hrs</div>
            <div className="text-white text-sm">of music streaming = 1kg of CO₂</div>
          </div>
        </div>
      </div>

      {/* Footer with Creator Credit */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-white text-sm opacity-70">Muhammad Omar Rasin</p>
      </div>
    </div>
  )
}
