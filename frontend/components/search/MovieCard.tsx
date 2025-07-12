import { Movie } from "@/model/movie";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getGenreName } from "@/lib/genres";
import { Star, Calendar, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatDate } from "@/lib/utils";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    const [addingMovieId, setAddingMovieId] = useState<string | null>(null)

    const handleAddToList = async (movieId: string) => {
        setAddingMovieId(movieId)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${movieId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })

            if (response.ok) {
                toast.success("Film ajouté à votre liste avec succès !");
            }
        } catch {
            toast.error("Erreur lors de l'ajout du film à votre liste. Veuillez réessayer.");
        } finally {
            setAddingMovieId(null)
        }
    }

    return (
        <Card
            key={movie.id}
            className="group border-slate-700/50 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm hover:from-slate-800/80 hover:to-slate-900/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10"
        >
            <CardContent className="p-4 space-y-3">
                <div className="flex gap-3">
                    <div className="relative flex-shrink-0">
                        <Image
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
                                    : "/placeholder.svg?height=160&width=240"
                            }
                            alt={movie.title}
                            className="w-16 h-24 object-cover rounded-md shadow-lg"
                            width={160}
                            height={240}
                        />
                        {movie.vote_average > 0 && (
                            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-1.5 py-0.5">
                                <Star className="w-2.5 h-2.5 mr-0.5" />
                                {movie.vote_average.toFixed(1)}
                            </Badge>
                        )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                        <div>
                            <h3 className="font-semibold text-white text-sm line-clamp-2 group-hover:text-blue-300 transition-colors">
                                {movie.title}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(movie.release_date)}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                            {movie.genre_ids.slice(0, 2).map((genreId) => (
                                <Badge
                                    key={genreId}
                                    variant="secondary"
                                    className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50 px-1.5 py-0.5"
                                >
                                    {getGenreName(genreId)}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {movie.overview && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{movie.overview}</p>
                )}

                <Button
                    onClick={() => handleAddToList(movie.id)}
                    disabled={addingMovieId === movie.id}
                    size="sm"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-blue-500/25"
                >
                    {addingMovieId === movie.id ? (
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Ajout...
                        </div>
                    ) : (
                        <>
                            <Plus className="w-3 h-3 mr-1.5" />
                            Ajouter
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    )
}