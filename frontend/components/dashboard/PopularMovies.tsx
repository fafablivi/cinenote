"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Loader2, TrendingUp } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { useDashboard } from "@/hooks/useDashboard"
import { formatDate } from "@/lib/utils"

export function PopularMovies() {
  const { movies, isLoading, error } = useDashboard()

  if (isLoading) {
    return (
      <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            Films populaires
          </CardTitle>
          <CardDescription className="text-slate-300">Les films tendance du moment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3 text-slate-300">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Chargement des films populaires...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            Films populaires
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-red-500/50 bg-red-900/20 backdrop-blur-sm">
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  const popularMovies = movies.slice(0, 6)

  return (
    <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-400" />
          Films populaires
        </CardTitle>
        <CardDescription className="text-slate-300">Les films tendance du moment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {popularMovies.map((movie) => (
            <div key={movie.id} className="group">
              <div className="relative aspect-[32/48] mb-3">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "/placeholder.svg?height=240&width=160"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-md shadow-lg group-hover:scale-105 transition-transform duration-200"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                />
                {movie.vote_average > 0 && (
                  <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-1.5 py-0.5">
                    <Star className="w-2.5 h-2.5 mr-0.5" />
                    {movie.vote_average.toFixed(1)}
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <div>
                  <h4 className="font-medium text-white text-sm line-clamp-2 group-hover:text-blue-300 transition-colors leading-tight">
                    {movie.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
