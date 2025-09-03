"use client"

import { Search, List, User, Film, Star, LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useDashboard } from "@/hooks/useDashboard"

export default function Homepage() {
    const { movies } = useDashboard()

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <header className="border-b border-slate-700 px-6 py-4">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-2">
                        <Film className="w-8 h-8 text-blue-500" />
                        <span className="text-xl font-semibold">CineNote</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={"/login"}>
                            <Button className="cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 px-4 py-2" >
                                <LogIn className="w-4 h-4 mr-2" />
                                Connexion
                            </Button>
                        </Link>
                        <Link href={"/register"}>
                            <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2">
                                <UserPlus className="w-4 h-4 mr-2" />
                                {"S'inscrire"}
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8 text-white">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4">Bienvenue sur CineNote</h1>
                    <p className="text-slate-400 text-xl mb-8 max-w-2xl mx-auto">
                        Découvrez, notez et organisez vos films préférés. Rejoignez une communauté passionnée de cinéphiles.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link href={"/register"}>
                            <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg px-2 py-1" >
                                <UserPlus className="w-5 h-5 mr-2" />
                                Commencer gratuitement
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Platform Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    <Card className="bg-slate-800 border-slate-700">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Films dans notre base</p>
                                    <p className="text-3xl text-white font-bold">50K+</p>
                                </div>
                                <Film className="w-8 h-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800 border-slate-700">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Utilisateurs actifs</p>
                                    <p className="text-3xl text-white font-bold">10K+</p>
                                </div>
                                <User className="w-8 h-8 text-green-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800 border-slate-700">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Notes données</p>
                                    <p className="text-3xl text-white font-bold">500K+</p>
                                </div>
                                <Star className="w-8 h-8 text-yellow-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-slate-800 border-slate-700">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Listes créées</p>
                                    <p className="text-3xl text-white font-bold">25K+</p>
                                </div>
                                <List className="w-8 h-8 text-purple-500" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-center mb-2">Pourquoi choisir CineNote ?</h2>
                    <p className="text-slate-400 text-center mb-8">
                        Toutes les fonctionnalités dont vous avez besoin pour gérer votre passion du cinéma
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="bg-slate-800 border-slate-700 p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                        <Search className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl text-white font-semibold">Découverte facile</h3>
                                </div>
                                <p className="text-slate-400">
                                    Trouvez facilement de nouveaux films grâce à notre moteur de recherche avancé et nos recommandations
                                    personnalisées.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800 border-slate-700 p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white">
                                        <Star className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl text-white font-semibold">Notation et critiques</h3>
                                </div>
                                <p className="text-slate-400">
                                    Notez vos films, écrivez des critiques et partagez vos opinions avec la communauté CineNote.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800 border-slate-700 p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                                        <List className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl text-white font-semibold">Listes personnalisées</h3>
                                </div>
                                <p className="text-slate-400">
                                    Créez des listes thématiques, suivez vos films à voir et organisez votre collection comme vous le
                                    souhaitez.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Popular Films */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Films populaires cette semaine</h2>
                            <p className="text-slate-400">Découvrez ce que regarde la communauté</p>
                        </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {movies.map((movie) => (
                            <div className="relative group cursor-pointer flex-shrink-0" key={`film-${movie.id}`}>
                                <Image
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                                            : "/placeholder.svg?height=240&width=160"
                                    }
                                    alt={`Affcihe de ${movie.title}`}
                                    className="w-48 h-72 object-cover rounded-lg"
                                    width={192}
                                    height={288}
                                />
                                <div className="absolute top-2 left-2 bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                                    <Star className="w-3 h-3" />
                                    {movie.vote_average}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-lg">
                                    <h3 className="font-semibold text-sm">{movie.title}</h3>
                                    <p className="text-xs text-slate-300">{new Date(movie.release_date).getFullYear()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mt-16 py-12 bg-slate-800 rounded-2xl">
                    <h2 className="text-3xl font-bold mb-4">Prêt à commencer votre voyage cinématographique ?</h2>
                    <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                        Rejoignez des milliers de cinéphiles qui utilisent déjà CineNote pour découvrir et organiser leurs films
                        préférés.
                    </p>
                    <Link href="/register">
                        <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg cursor-pointer">
                            <UserPlus className="w-5 h-5 mr-2" />
                            Créer mon compte gratuitement
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    )
}
