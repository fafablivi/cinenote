"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Star, Calendar, Trash2, Eye, EyeOff, MoreVertical, Clock } from "lucide-react"
import Image from "next/image"
import { WatchlistMovie } from "@/model/movie"
import { formatDate } from "@/lib/utils"

interface WatchlistCardProps {
  movie: WatchlistMovie
  onRemove: (movieId: string) => Promise<boolean>
  onToggleWatched: (movieId: string, watched: boolean) => Promise<boolean>
  onRate: (movieId: string, rating: number) => Promise<boolean>
}

export function WatchlistCard({ movie, onRemove, onToggleWatched, onRate }: WatchlistCardProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [showRating, setShowRating] = useState(false)

  const handleRemove = async () => {
    setIsRemoving(true)
    await onRemove(movie.id)
    setIsRemoving(false)
  }

  const handleToggleWatched = async () => {
    setIsToggling(true)
    await onToggleWatched(movie.id, !movie.watched)
    setIsToggling(false)
  }

  const handleRate = async (rating: number) => {
    await onRate(movie.id, rating)
    setShowRating(false)
  }

  return (
    <Card
      className={`group border-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 ${
        movie.watched
          ? "bg-gradient-to-br from-green-900/20 to-slate-900/60 border-green-700/30"
          : "bg-gradient-to-br from-slate-800/60 to-slate-900/60"
      }`}
    >
      <CardContent className="p-4 space-y-3">
        {/* Movie Poster and Info */}
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
                  : "/placeholder.svg?height=120&width=80"
              }
              alt={movie.title}
              className="w-20 h-30 object-cover rounded-md shadow-lg"
              width={80}
              height={120}
            />
            {movie.watched && (
              <Badge className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1.5 py-0.5">
                <Eye className="w-2.5 h-2.5 mr-0.5" />
                Vu
              </Badge>
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-white text-lg line-clamp-2 group-hover:text-blue-300 transition-colors">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(movie.release_date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Ajouté le {formatDate(movie.created_at)}
                  </span>
                </div>
              </div>

              {/* Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700" align="end">
                  <DropdownMenuItem
                    onClick={handleToggleWatched}
                    disabled={isToggling}
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    {movie.watched ? (
                      <>
                        <EyeOff className="mr-2 h-4 w-4" />
                        Marquer comme non vu
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Marquer comme vu
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowRating(!showRating)}
                    className="text-slate-300 hover:text-white hover:bg-slate-700"
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Noter le film
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleRemove}
                    disabled={isRemoving}
                    className="text-red-400 hover:text-red-300 hover:bg-slate-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Genres
            <div className="flex flex-wrap gap-1">
              {movie.genre_ids.slice(0, 3).map((genreId) => (
                <Badge
                  key={genreId}
                  variant="secondary"
                  className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50 px-2 py-0.5"
                >
                  {getGenreName(genreId)}
                </Badge>
              ))}
            </div> */}

            {/* User Rating */}
            {movie.rating && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Ma note:</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < movie.rating! ? "text-yellow-400 fill-current" : "text-slate-600"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-yellow-400 ml-1">{movie.rating}/5</span>
                </div>
              </div>
            )}

            {/* Rating Interface */}
            {showRating && (
              <div className="flex items-center gap-2 p-2 bg-slate-700/50 rounded-md">
                <span className="text-sm text-slate-300">Noter:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRate(rating)}
                      className="p-1 hover:bg-slate-600 rounded transition-colors"
                    >
                      <Star className="w-4 h-4 text-yellow-400 hover:fill-current" />
                    </button>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRating(false)}
                  className="text-slate-400 hover:text-white"
                >
                  Annuler
                </Button>
              </div>
            )}

            {/* Overview */}
            {movie.description && <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{movie.description}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
