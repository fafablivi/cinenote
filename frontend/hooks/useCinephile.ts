"use client"

import { Cinephile } from "@/model/cinephile"
import { useEffect, useState } from "react"

export function useCinephile() {
    const [cinephile, setCinephile] = useState<Cinephile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchCinephile = async () => {
            try {
                const cinephileId = localStorage.getItem("cinephileId")
                const token = localStorage.getItem("token")

                if (!cinephileId || !token) {
                    return
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cinephile/${cinephileId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setCinephile(data || null)
                } else if (response.status === 401) {
                    localStorage.removeItem("token")
                    localStorage.removeItem("cinephileId")
                    window.location.href = "/login"
                }
            } catch {
                setError("Erreur de connexion")
            } finally {
                setIsLoading(false)
            }
        }
        fetchCinephile()
    }, [])

    return {
        cinephile,
        isLoading,
        error
    }
}