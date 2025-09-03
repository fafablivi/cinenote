"use client"

import { Card, CardContent } from "@/components/ui/card"
import { WatchlistMovie } from "@/model/movie"
import { Film, Eye, Star } from "lucide-react"

interface WatchlistStatsProps {
  movies: WatchlistMovie[]
}

export function WatchlistStats({ movies }: WatchlistStatsProps) {
  const totalMovies = movies.length
  const watchedMovies = movies.filter((movie) => movie.watched).length
  const ratedMovies = movies.filter((movie) => movie.rating).length
  const averageRating =
    ratedMovies > 0 ? movies.reduce((sum, movie) => sum + (movie.rating || 0), 0) / ratedMovies : 0

  const stats = [
    {
      title: "Total des films",
      value: totalMovies,
      icon: Film,
      color: "text-blue-400",
    },
    {
      title: "Films vus",
      value: watchedMovies,
      icon: Eye,
      color: "text-green-400",
    },
    {
      title: "Films notés",
      value: ratedMovies,
      icon: Star,
      color: "text-yellow-400",
    },
    {
      title: "Note moyenne",
      value: averageRating > 0 ? `${averageRating.toFixed(1)}/5` : "N/A",
      icon: Star,
      color: "text-orange-400",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
