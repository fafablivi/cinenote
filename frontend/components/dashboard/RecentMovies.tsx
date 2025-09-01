"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Calendar, Search } from "lucide-react"
import Image from "next/image"
import { WatchlistMovie } from "@/model/movie"
import { formatDate } from "@/lib/utils"

interface RecentMoviesProps {
  movies: WatchlistMovie[]
}

export function RecentMovies({ movies }: RecentMoviesProps) {
  const recentMovies = movies.slice(0, 6)

  if (movies.length === 0) {
    return (
      <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <Search className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-medium text-slate-300 mb-2">Votre liste est vide</h3>
          <p className="text-slate-500 mb-6">Commencez par ajouter des films à votre collection</p>
          <Link href="/search">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
              <Search className="w-4 h-4 mr-2" />
              Rechercher des films
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white">Films récents</CardTitle>
          <CardDescription className="text-slate-300">Vos derniers ajouts à votre liste</CardDescription>
        </div>
        <Link href="/watchlist">
          <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
            Voir tout
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {recentMovies.map((movie) => (
            <div key={movie.id} className="group cursor-pointer">
              <div className="relative aspect-[32/48] mb-2">
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
                {movie.watched && (
                  <Badge className="absolute top-2 right-2 bg-green-600 text-white text-xs px-1.5 py-0.5">
                    <Eye className="w-2.5 h-2.5 mr-0.5" />
                    Vu
                  </Badge>
                )}
              </div>
              <h4 className="font-medium text-white text-sm line-clamp-2 group-hover:text-blue-300 transition-colors">
                {movie.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
