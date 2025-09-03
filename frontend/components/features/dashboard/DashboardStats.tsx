"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Film, Eye, Star, TrendingUp, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useDashboard } from "@/hooks/useDashboard"

export function DashboardStats() {
  const { stats, isLoading, error } = useDashboard()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-center h-16">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert className="border-red-500/50 bg-red-900/20 backdrop-blur-sm">
        <AlertDescription className="text-red-400">{error}</AlertDescription>
      </Alert>
    )
  }

  if (!stats) return null

  const statsData = [
    {
      title: "Films dans ma liste",
      value: stats.totalMovies,
      icon: Film,
      color: "text-blue-400",
    },
    {
      title: "Films vus",
      value: stats.watchedMovies,
      icon: Eye,
      color: "text-green-400",
    },
    {
      title: "Note moyenne",
      value: stats.averageRating > 0 ? `${stats.averageRating.toFixed(1)}/5` : "N/A",
      icon: Star,
      color: "text-yellow-400",
    },
    {
      title: "Ce mois-ci",
      value: stats.thisMonth,
      icon: TrendingUp,
      color: "text-purple-400",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <Card key={index} className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
