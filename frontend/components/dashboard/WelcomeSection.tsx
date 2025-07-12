"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function WelcomeSection() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Bonjour,
        </h1>
        <p className="text-slate-400">Découvrez de nouveaux films et gérez votre collection</p>
      </div>
      <Link href="/search">
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
          <Search className="w-4 h-4 mr-2" />
          Rechercher des films
        </Button>
      </Link>
    </div>
  )
}
