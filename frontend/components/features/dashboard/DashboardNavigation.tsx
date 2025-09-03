"use client"

import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Film } from "lucide-react"

interface DashboardNavigationProps {
  user: {
    id: string
    name: string
    email: string
    profile_picture?: string
  }
}

export function DashboardNavigation({ user }: DashboardNavigationProps) {
  return (
    <nav className="border-b border-slate-700 bg-slate-800/50 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">CineNote</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/search" className="text-slate-300 hover:text-white transition-colors">
              Rechercher
            </Link>
            <Link href="/watchlist" className="text-slate-300 hover:text-white transition-colors">
              Ma Liste
            </Link>
            <Avatar className="h-8 w-8 border-2 border-slate-600">
              <AvatarImage src={user.profile_picture || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-slate-700 text-blue-400 text-sm">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  )
}
