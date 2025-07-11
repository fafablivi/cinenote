"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Film, User, LogOut, Home, Loader2 } from "lucide-react"
import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { Toaster } from "react-hot-toast"

interface CinephileProfile {
    id: string
    name: string
    email: string
    profile_picture?: string
    biography?: string
    created_at: string
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<CinephileProfile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const cinephileId = localStorage.getItem("cinephileId")

                if (!cinephileId) {
                    router.push("/login")
                    return
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cinephile/${cinephileId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
                        },
                    }
                )

                if (response.ok) {
                    const data = await response.json()
                    setUser(data)
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du profil:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserProfile()
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem("cinephileId")
        localStorage.removeItem("token")
        router.push("/login")
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="flex items-center gap-3 text-slate-300">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Chargement...</span>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            <nav className="border-b border-slate-700 bg-slate-800/50 backdrop-blur sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/profile" className="flex items-center space-x-2">
                            <Film className="w-8 h-8 text-blue-400" />
                            <span className="text-xl font-bold text-white">CineNote</span>
                        </Link>

                        <div className="hidden md:flex items-center space-x-6">
                            {/* <Link
                                href="/dashboard"
                                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                            >
                                <Home className="w-4 h-4" />
                                <span>Accueil</span>
                            </Link> */}
                            <Link
                                href="/search"
                                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
                            >
                                <Search className="w-4 h-4" />
                                <span>Rechercher</span>
                            </Link>
                        </div>

                        <Suspense fallback={<div>Loading...</div>}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <Avatar className="h-10 w-10 border-2 border-slate-600">
                                            <AvatarImage src={user.profile_picture || "/placeholder.svg"} alt={user.name} />
                                            <AvatarFallback className="bg-slate-700 text-blue-400">
                                                {user.name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700" align="end">
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1 leading-none">
                                            <p className="font-medium text-white">{user.name}</p>
                                            <p className="text-xs text-slate-400">{user.email}</p>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator className="bg-slate-700" />
                                    <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                        <Link href="/profile" className="flex items-center space-x-2 w-full">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profil</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                                        <Link href="/watchlist" className="flex items-center space-x-2">
                                            <Film className="mr-2 h-4 w-4" />
                                            <span>Ma liste</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-slate-700" />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="text-red-400 hover:text-red-300 hover:bg-slate-700"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Déconnexion</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Suspense>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">{children}</main>
        </div>
    )
}
