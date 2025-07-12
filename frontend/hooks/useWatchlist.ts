"use client"

import { WatchlistMovie } from "@/model/movie"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"

export function useWatchlist() {
  const [movies, setMovies] = useState<WatchlistMovie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchWatchlist = async () => {
    setIsLoading(true)
    setError("")

    try {
      const cinephileId = localStorage.getItem("cinephileId")
      const token = localStorage.getItem("token")

      if (!cinephileId || !token) {
        setError("Authentification requise")
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${cinephileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setMovies(data.movies || [])
      } else if (response.status === 401) {
        setError("Session expirée, veuillez vous reconnecter")
        localStorage.removeItem("token")
        localStorage.removeItem("cinephileId")
        window.location.href = "/login"
      } else {
        setError("Erreur lors du chargement de votre liste")
      }
    } catch {
      setError("Erreur de connexion au serveur")
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromWatchlist = async (movieId: string) => {
    try {
      const token = localStorage.getItem("token")
      const cinephileId = localStorage.getItem("cinephileId")

      if (!token || !cinephileId) return false

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${cinephileId}/${movieId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        toast.success("Film retiré de votre liste avec succès")
        setMovies((prev) => prev.filter((movie) => movie.id !== movieId))
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const toggleWatched = async (movieId: string, watched: boolean) => {
    try {
      const token = localStorage.getItem("token")

      if (!token) return false

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${movieId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ watched }),
      })

      if (response.ok) {
        setMovies((prev) => prev.map((movie) => (movie.id === movieId ? { ...movie, watched } : movie)))
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const rateMovie = async (movieId: string, rating: number) => {
    try {
      const token = localStorage.getItem("token")
      const cinephileId = localStorage.getItem("cinephileId")

      if (!token || !cinephileId) return false

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${movieId}/rate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating }),
      })

      if (response.ok) {
        setMovies((prev) => prev.map((movie) => (movie.id === movieId ? { ...movie, user_rating: rating } : movie)))
        return true
      }
      return false
    } catch {
      return false
    }
  }

  useEffect(() => {
    fetchWatchlist()
  }, [])

  return {
    movies,
    isLoading,
    error,
    refetch: fetchWatchlist,
    removeFromWatchlist,
    toggleWatched,
    rateMovie,
  }
}
