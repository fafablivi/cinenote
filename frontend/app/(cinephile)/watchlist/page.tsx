"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Film, Search, Filter, RefreshCw, Loader2 } from "lucide-react"
import { useWatchlist } from "@/hooks/useWatchlist"
import { WatchlistCard } from "@/components/watchlist/WatchlistCard"
import { WatchlistStats } from "@/components/watchlist/WatchlistStats"

export default function WatchlistPage() {
  const { movies, isLoading, error, refetch, removeFromWatchlist, toggleWatched, rateMovie } = useWatchlist()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "watched" | "unwatched">("all")
  const [sortBy, setSortBy] = useState<"added_date" | "title" | "release" | "rating">("added_date")

  const filteredAndSortedMovies = movies
    .filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "watched" && movie.watched) ||
        (filterStatus === "unwatched" && !movie.watched)
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "release":
          return new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "added_date":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center gap-3 text-slate-300">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Chargement de votre liste...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-slate-200 bg-clip-text text-transparent">
            Ma Liste de Films
          </h1>
          <p className="text-slate-400 mt-1">Gérez votre collection personnelle</p>
        </div>
        <Button
          onClick={refetch}
          variant="outline"
          className="border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {error && (
        <Alert className="border-red-500/50 bg-red-900/20 backdrop-blur-sm">
          <AlertDescription className="text-red-400">{error}</AlertDescription>
        </Alert>
      )}

      {movies.length > 0 && <WatchlistStats movies={movies} />}

      {movies.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Rechercher dans ma liste..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-600/50 bg-slate-700/50 text-white placeholder:text-slate-400"
            />
          </div>

          <Select value={filterStatus} onValueChange={(value: "all" | "watched" | "unwatched") => setFilterStatus(value)}>
            <SelectTrigger className="w-full sm:w-48 border-slate-600/50 bg-slate-700/50 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all" className="text-slate-300">
                Tous les films
              </SelectItem>
              <SelectItem value="watched" className="text-slate-300">
                Films vus
              </SelectItem>
              <SelectItem value="unwatched" className="text-slate-300">
                À voir
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: "title" | "added_date" | "release" | "rating") => setSortBy(value)}>
            <SelectTrigger className="w-full sm:w-48 border-slate-600/50 bg-slate-700/50 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="added_date" className="text-slate-300">
                {"Date d'ajout"}
              </SelectItem>
              <SelectItem value="title" className="text-slate-300">
                Titre
              </SelectItem>
              <SelectItem value="release" className="text-slate-300">
                Date de sortie
              </SelectItem>
              <SelectItem value="rating" className="text-slate-300">
                Note
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {filteredAndSortedMovies.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              {filteredAndSortedMovies.length} film{filteredAndSortedMovies.length > 1 ? "s" : ""}
              {searchTerm && ` pour "${searchTerm}"`}
            </h2>
            <Badge variant="secondary" className="bg-blue-900/30 text-blue-300 border-blue-700/50">
              {filterStatus === "watched" && "Films vus"}
              {filterStatus === "unwatched" && "À voir"}
              {filterStatus === "all" && "Tous"}
            </Badge>
          </div>

          <div className="grid gap-4">
            {filteredAndSortedMovies.map((movie) => (
              <WatchlistCard
                key={movie.id}
                movie={movie}
                onRemove={removeFromWatchlist}
                onToggleWatched={toggleWatched}
                onRate={rateMovie}
              />
            ))}
          </div>
        </div>
      ) : movies.length > 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <Search className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-medium text-slate-300 mb-2">Aucun résultat</h3>
          <p className="text-slate-500">
            {searchTerm
              ? `Aucun film trouvé pour "${searchTerm}"`
              : "Aucun film ne correspond aux filtres sélectionnés"}
          </p>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <Film className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-medium text-slate-300 mb-2">Votre liste est vide</h3>
          <p className="text-slate-500 mb-6">Commencez par ajouter des films à votre collection</p>
          <Button
            onClick={() => (window.location.href = "/search")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <Search className="w-4 h-4 mr-2" />
            Rechercher des films
          </Button>
        </div>
      )}
    </div>
  )
}
