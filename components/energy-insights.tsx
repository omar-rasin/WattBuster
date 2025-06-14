"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Lightbulb, Target, TrendingDown, Award, AlertTriangle } from "lucide-react"

interface EnergyInsightsProps {
  data: any[]
}

export function EnergyInsights({ data }: EnergyInsightsProps) {
  // Add data validation
  if (!data || data.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center">
          <Lightbulb className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">No Data Available</h3>
          <p className="text-gray-300">Start tracking your digital activities to see personalized insights!</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate various insights
  const totalEnergy = data.reduce((sum, day) => sum + day.totalEnergy, 0)
  const avgDaily = totalEnergy / data.length
  const dailyGoal = 500 // 500W daily goal

  // Find most/least efficient days with additional validation
  const validDays = data.filter((day) => day && day.totalEnergy !== undefined)
  if (validDays.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">Invalid Data</h3>
          <p className="text-gray-300">There seems to be an issue with your activity data. Please try refreshing.</p>
        </CardContent>
      </Card>
    )
  }

  const sortedDays = [...validDays].sort((a, b) => a.totalEnergy - b.totalEnergy)
  const mostEfficientDay = sortedDays[0]
  const leastEfficientDay = sortedDays[sortedDays.length - 1]

  // Calculate streaks
  const underGoalDays = data.filter((day) => day.totalEnergy <= dailyGoal).length
  const goalPercentage = (underGoalDays / data.length) * 100

  // Activity insights
  const activityTotals: Record<string, number> = {}
  data.forEach((day) => {
    Object.entries(day.activities).forEach(([activity, activityData]: [string, any]) => {
      activityTotals[activity] = (activityTotals[activity] || 0) + activityData.energy
    })
  })

  const topActivity = Object.entries(activityTotals).sort(([, a], [, b]) => b - a)[0]

  const activityNames: Record<string, string> = {
    youtube: "YouTube",
    netflix: "Netflix",
    gaming: "Gaming",
    social: "Social Media",
    email: "Email",
    videocalls: "Video Calls",
    music: "Music Streaming",
    shopping: "Online Shopping",
    tiktok: "TikTok",
    podcast: "Podcasts",
    cloud: "Cloud Sync",
    search: "Web Search",
  }

  // Generate personalized recommendations
  const getRecommendations = () => {
    const recommendations = []

    if (avgDaily > dailyGoal * 1.5) {
      recommendations.push({
        icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
        title: "High Energy Usage Alert",
        description: `Your daily average (${Math.round(avgDaily)}W) is 50% above the recommended goal. Consider reducing high-energy activities.`,
        priority: "high",
      })
    }

    if (topActivity && topActivity[1] > totalEnergy * 0.4) {
      recommendations.push({
        icon: <Target className="w-5 h-5 text-yellow-400" />,
        title: "Activity Concentration",
        description: `${activityNames[topActivity[0]]} accounts for ${Math.round((topActivity[1] / totalEnergy) * 100)}% of your energy usage. Try diversifying your digital activities.`,
        priority: "medium",
      })
    }

    if (goalPercentage < 30) {
      recommendations.push({
        icon: <TrendingDown className="w-5 h-5 text-orange-400" />,
        title: "Goal Achievement",
        description: `You've only met your daily goal ${Math.round(goalPercentage)}% of the time. Try setting smaller, achievable targets.`,
        priority: "medium",
      })
    }

    if (goalPercentage > 70) {
      recommendations.push({
        icon: <Award className="w-5 h-5 text-green-400" />,
        title: "Great Progress!",
        description: `You've met your daily goal ${Math.round(goalPercentage)}% of the time. Consider setting a more ambitious target!`,
        priority: "positive",
      })
    }

    return recommendations
  }

  const recommendations = getRecommendations()

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            Energy Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Goal Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-medium">Daily Goal Achievement</span>
              <span className="text-cyan-400 font-bold">{Math.round(goalPercentage)}%</span>
            </div>
            <Progress value={goalPercentage} className="h-3 bg-gray-700" />
            <p className="text-gray-300 text-sm mt-2">
              {underGoalDays} out of {data.length} days under {dailyGoal}W goal
            </p>
          </div>

          {/* Efficiency Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
              <h4 className="text-green-400 font-semibold mb-2">🌟 Most Efficient Day</h4>
              <p className="text-white text-lg font-bold">{new Date(mostEfficientDay.date).toLocaleDateString()}</p>
              <p className="text-green-300 text-sm">{mostEfficientDay.totalEnergy}W total usage</p>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-lg">
              <h4 className="text-red-400 font-semibold mb-2">⚡ Highest Usage Day</h4>
              <p className="text-white text-lg font-bold">{new Date(leastEfficientDay.date).toLocaleDateString()}</p>
              <p className="text-red-300 text-sm">{leastEfficientDay.totalEnergy}W total usage</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Target className="w-5 h-5 text-cyan-400" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                rec.priority === "high"
                  ? "bg-red-500/10 border-red-400/30"
                  : rec.priority === "medium"
                    ? "bg-yellow-500/10 border-yellow-400/30"
                    : rec.priority === "positive"
                      ? "bg-green-500/10 border-green-400/30"
                      : "bg-blue-500/10 border-blue-400/30"
              }`}
            >
              <div className="flex items-start gap-3">
                {rec.icon}
                <div>
                  <h4 className="text-white font-semibold mb-1">{rec.title}</h4>
                  <p className="text-gray-300 text-sm">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}

          {recommendations.length === 0 && (
            <div className="p-4 bg-cyan-500/10 border border-cyan-400/30 rounded-lg text-center">
              <Award className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-cyan-300 font-semibold">Perfect Energy Management!</p>
              <p className="text-gray-300 text-sm">You're doing great with your digital energy usage. Keep it up!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white/5 rounded-lg text-center">
          <div className="text-2xl font-bold text-cyan-400 mb-1">{Math.round(avgDaily)}W</div>
          <div className="text-xs text-gray-300">Daily Average</div>
        </div>
        <div className="p-4 bg-white/5 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">{Math.round(totalEnergy)}W</div>
          <div className="text-xs text-gray-300">Total Period</div>
        </div>
        <div className="p-4 bg-white/5 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">{underGoalDays}</div>
          <div className="text-xs text-gray-300">Goal Days</div>
        </div>
        <div className="p-4 bg-white/5 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-400 mb-1">
            {topActivity ? activityNames[topActivity[0]]?.split(" ")[0] : "N/A"}
          </div>
          <div className="text-xs text-gray-300">Top Activity</div>
        </div>
      </div>
    </div>
  )
}
