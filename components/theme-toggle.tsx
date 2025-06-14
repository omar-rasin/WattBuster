"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme) {
      setIsDark(theme === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
    document.documentElement.classList.toggle("dark", newTheme)
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="relative w-12 h-12 rounded-full border-2 border-cyan-400/50 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
    >
      <div className="relative w-6 h-6">
        <Sun
          className={`absolute inset-0 w-6 h-6 text-yellow-400 transition-all duration-300 ${
            isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute inset-0 w-6 h-6 text-cyan-400 transition-all duration-300 ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </div>
    </Button>
  )
}
