"use client"

import { useState, useEffect } from "react"
import { Lightbulb, X } from "lucide-react"

interface EnergyTipProps {
  tip: string
}

export function EnergyTip({ tip }: EnergyTipProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full z-20 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-3 rounded-lg shadow-lg max-w-xs relative">
        <div className="flex items-start gap-2">
          <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{tip}</p>
          <button onClick={() => setIsVisible(false)} className="ml-auto flex-shrink-0 hover:bg-black/10 rounded p-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-500"></div>
      </div>
    </div>
  )
}
