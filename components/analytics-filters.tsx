"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Filter } from "lucide-react"

interface AnalyticsFiltersProps {
  selectedPeriod: "7d" | "30d" | "90d"
  onPeriodChange: (period: "7d" | "30d" | "90d") => void
  selectedActivity: string
  onActivityChange: (activity: string) => void
  analyticsData: any[]
}

export function AnalyticsFilters({
  selectedPeriod,
  onPeriodChange,
  selectedActivity,
  onActivityChange,
  analyticsData,
}: AnalyticsFiltersProps) {
  const periods = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
  ]

  const activities = [
    { value: "all", label: "All Activities" },
    { value: "youtube", label: "YouTube" },
    { value: "netflix", label: "Netflix" },
    { value: "gaming", label: "Gaming" },
    { value: "social", label: "Social Media" },
    { value: "videocalls", label: "Video Calls" },
    { value: "music", label: "Music Streaming" },
    { value: "shopping", label: "Online Shopping" },
    { value: "tiktok", label: "TikTok" },
    { value: "podcast", label: "Podcasts" },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-cyan-400" />
        <span className="text-white font-medium">Time Period:</span>
      </div>

      <div className="flex gap-2">
        {periods.map((period) => (
          <Button
            key={period.value}
            onClick={() => onPeriodChange(period.value as "7d" | "30d" | "90d")}
            variant={selectedPeriod === period.value ? "default" : "outline"}
            size="sm"
            className={`${
              selectedPeriod === period.value
                ? "bg-cyan-500 hover:bg-cyan-400 text-white"
                : "border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20"
            }`}
          >
            {period.label}
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Filter className="w-5 h-5 text-purple-400" />
        <span className="text-white font-medium">Activity:</span>
        <Select value={selectedActivity} onValueChange={onActivityChange}>
          <SelectTrigger className="w-48 bg-white/10 border-purple-400/50 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-purple-400/50">
            {activities.map((activity) => (
              <SelectItem key={activity.value} value={activity.value} className="text-white hover:bg-purple-400/20">
                {activity.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
