"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { EnergyTip } from "@/components/energy-tip"
import {
  Youtube,
  Tv,
  Gamepad2,
  Smartphone,
  Mail,
  ArrowRight,
  Clock,
  Zap,
  Video,
  Music,
  ShoppingCart,
  Headphones,
  Cloud,
  Search,
} from "lucide-react"
import { ActivityCategories } from "@/components/activity-categories"

interface Activity {
  id: string
  name: string
  icon: React.ReactNode
  energyPerHour: number // watts per hour
  selected: boolean
  hours: number
  tip: string
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "youtube",
      name: "Watching YouTube",
      icon: <Youtube className="w-8 h-8" />,
      energyPerHour: 150,
      selected: false,
      hours: 1,
      tip: "Watching in 1080p instead of 4K saves 30% energy!",
    },
    {
      id: "netflix",
      name: "Streaming Netflix",
      icon: <Tv className="w-8 h-8" />,
      energyPerHour: 200,
      selected: false,
      hours: 1,
      tip: "Downloading shows for offline viewing uses 50% less energy!",
    },
    {
      id: "gaming",
      name: "Playing Video Games",
      icon: <Gamepad2 className="w-8 h-8" />,
      energyPerHour: 300,
      selected: false,
      hours: 1,
      tip: "Gaming in power-saving mode reduces energy by 25%!",
    },
    {
      id: "social",
      name: "Browsing Social Media",
      icon: <Smartphone className="w-8 h-8" />,
      energyPerHour: 100,
      selected: false,
      hours: 1,
      tip: "Dark mode reduces screen energy by 20%!",
    },
    {
      id: "email",
      name: "Sending Emails",
      icon: <Mail className="w-8 h-8" />,
      energyPerHour: 50,
      selected: false,
      hours: 1,
      tip: "Unsubscribing from newsletters saves server energy!",
    },
    {
      id: "videocalls",
      name: "Video Calls",
      icon: <Video className="w-8 h-8" />,
      energyPerHour: 180,
      selected: false,
      hours: 1,
      tip: "Turn off video when not needed to save 40% energy!",
    },
    {
      id: "music",
      name: "Music Streaming",
      icon: <Music className="w-8 h-8" />,
      energyPerHour: 80,
      selected: false,
      hours: 1,
      tip: "Download playlists for offline listening to reduce streaming energy!",
    },
    {
      id: "shopping",
      name: "Online Shopping",
      icon: <ShoppingCart className="w-8 h-8" />,
      energyPerHour: 120,
      selected: false,
      hours: 1,
      tip: "Make a wishlist to reduce browsing time and energy waste!",
    },
    {
      id: "tiktok",
      name: "Watching TikTok",
      icon: <Smartphone className="w-8 h-8" />,
      energyPerHour: 140,
      selected: false,
      hours: 1,
      tip: "Set time limits to avoid endless scrolling and save energy!",
    },
    {
      id: "podcast",
      name: "Listening to Podcasts",
      icon: <Headphones className="w-8 h-8" />,
      energyPerHour: 60,
      selected: false,
      hours: 1,
      tip: "Audio-only content uses 70% less energy than video!",
    },
    {
      id: "cloud",
      name: "Cloud Storage Sync",
      icon: <Cloud className="w-8 h-8" />,
      energyPerHour: 90,
      selected: false,
      hours: 1,
      tip: "Sync files during off-peak hours to reduce server load!",
    },
    {
      id: "search",
      name: "Web Searching",
      icon: <Search className="w-8 h-8" />,
      energyPerHour: 70,
      selected: false,
      hours: 1,
      tip: "Use specific keywords to find results faster and save energy!",
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState("all")

  const getActivityCategory = (activityId: string) => {
    const categories = {
      entertainment: ["youtube", "netflix", "gaming", "tiktok"],
      communication: ["videocalls", "email", "social"],
      audio: ["music", "podcast"],
      productivity: ["shopping", "cloud", "search"],
    }

    for (const [category, activities] of Object.entries(categories)) {
      if (activities.includes(activityId)) return category
    }
    return "other"
  }

  const filteredActivities = activities.filter(
    (activity) => selectedCategory === "all" || getActivityCategory(activity.id) === selectedCategory,
  )

  const [showTip, setShowTip] = useState<string | null>(null)

  const toggleActivity = (id: string) => {
    setActivities((prev) =>
      prev.map((activity) => (activity.id === id ? { ...activity, selected: !activity.selected } : activity)),
    )

    // Show tip when activity is selected
    const activity = activities.find((a) => a.id === id)
    if (activity && !activity.selected) {
      setShowTip(id)
      setTimeout(() => setShowTip(null), 3000)
    }
  }

  const updateHours = (id: string, hours: number) => {
    setActivities((prev) => prev.map((activity) => (activity.id === id ? { ...activity, hours } : activity)))
  }

  const totalEnergy = activities.filter((a) => a.selected).reduce((sum, a) => sum + a.energyPerHour * a.hours, 0)

  const selectedActivities = activities.filter((a) => a.selected)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              WattBuster
            </h1>
          </Link>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Select Your Daily Digital Activities</h2>
          <p className="text-gray-300 text-lg">Choose what you do online and for how long</p>
        </div>

        {/* Activity Categories */}
        <ActivityCategories selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="relative">
              <Card
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  activity.selected
                    ? "bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border-cyan-400/50 shadow-lg shadow-cyan-500/25"
                    : "bg-white/10 border-white/20 hover:bg-white/20"
                } backdrop-blur-sm`}
                onClick={() => toggleActivity(activity.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`flex justify-center flex-1 ${activity.selected ? "text-cyan-400" : "text-white"}`}>
                      {activity.icon}
                    </div>
                    <div className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded-full">
                      {getActivityCategory(activity.id)}
                    </div>
                  </div>
                  <h3 className="text-white font-semibold mb-4">{activity.name}</h3>

                  {activity.selected && (
                    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-white text-sm">Hours per day:</span>
                      </div>
                      <div className="flex gap-2 justify-center flex-wrap">
                        {[1, 2, 3, 4, 5].map((hours) => (
                          <Button
                            key={hours}
                            size="sm"
                            variant={activity.hours === hours ? "default" : "outline"}
                            className={`w-10 h-10 rounded-full ${
                              activity.hours === hours
                                ? "bg-cyan-500 hover:bg-cyan-400 text-white"
                                : "border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20"
                            }`}
                            onClick={() => updateHours(activity.id, hours)}
                          >
                            {hours}
                          </Button>
                        ))}
                      </div>
                      <div className="text-sm text-gray-300 mt-2">
                        <Zap className="w-4 h-4 inline mr-1" />
                        {activity.energyPerHour * activity.hours}W per day
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Energy Tip */}
              {showTip === activity.id && <EnergyTip tip={activity.tip} />}
            </div>
          ))}
        </div>

        {/* Summary and Continue */}
        {selectedActivities.length > 0 && (
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-2">Daily Energy Total</h3>
              <div className="text-3xl font-bold text-cyan-400 mb-2">{totalEnergy}W</div>
              <div className="text-gray-300 text-sm">
                That's like running {Math.round(totalEnergy / 60)} light bulbs for a day!
              </div>
            </div>

            <Link href="/visualize">
              <Button className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 rounded-full transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center gap-2">
                  Visualize My Energy Impact
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
