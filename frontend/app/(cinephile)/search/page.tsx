"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Search } from "lucide-react"
import { Movie } from "@/model/movie"
import MovieCard from "../../../components/search/MovieCard"
import SearchSection from "../../../components/search/SearchSection"

export default function SearchPage() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        document.title = "CinéNote - Recherche de films";
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-slate-200 bg-clip-text text-transparent">
                    Rechercher des films
                </h1>
                <p className="text-slate-400">Découvrez et ajoutez des films à votre collection</p>
            </div>

            <SearchSection
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setError={setError}
                setMovies={setMovies}
            />

            {/* Error Alert */}
            {error && (
                <Alert className="max-w-2xl mx-auto border-red-500/50 bg-red-900/20 backdrop-blur-sm">
                    <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
            )}

            {/* Results Section */}
            {movies.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            {movies.length} résultat{movies.length > 1 ? "s" : ""} trouvé{movies.length > 1 ? "s" : ""}
                        </h2>
                        <Badge variant="secondary" className="bg-blue-900/30 text-blue-300 border-blue-700/50">
                            {movies.length} film{movies.length > 1 ? "s" : ""}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                            />))
                        }
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && movies.length === 0 && !error && (
                <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                        <Search className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-300 mb-2">Commencez votre recherche</h3>
                    <p className="text-slate-500">{"Saisissez le titre d'un film pour découvrir de nouveaux contenus"}</p>
                </div>
            )}
        </div>
    )
}
