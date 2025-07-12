"use client"

import { Movie } from "@/model/movie"
import { useState, useEffect } from "react"

export interface DashboardStats {
    totalMovies: number
    watchedMovies: number
    averageRating: number
    thisMonth: number
    totalRatings: number
}

export function useDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/popular`)

                if (response.ok) {
                    const data = await response.json()
                    setMovies(data.results || data || [])
                } else {
                    setError("Erreur lors du chargement des films populaires")
                }
            } catch {
                setError("Erreur de connexion")
            } finally {
                setIsLoading(false)
            }
        }

        fetchPopularMovies()
    }, [])

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const cinephileId = localStorage.getItem("cinephileId")
                const token = localStorage.getItem("token")

                if (!cinephileId || !token) {
                    setError("Authentification requise")
                    return
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/stats/${cinephileId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setStats(data)
                } else if (response.status === 401) {
                    setError("Session expirée")
                    localStorage.removeItem("token")
                    localStorage.removeItem("cinephileId")
                    window.location.href = "/login"
                } else {
                    setError("Erreur lors du chargement des statistiques")
                }
            } catch {
                setError("Erreur de connexion")
            } finally {
                setIsLoading(false)
            }
        }

        fetchStats()
    }, [])

    return {
        stats,
        movies,
        isLoading,
        error,
    }
}
