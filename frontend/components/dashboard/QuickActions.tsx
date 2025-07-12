"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Film, Star } from "lucide-react"

export function QuickActions() {
  return (
    <Card className="border-slate-700/50 bg-slate-800/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Actions rapides</CardTitle>
        <CardDescription className="text-slate-300">Accédez rapidement à vos fonctionnalités préférées</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/search">
          <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            <Search className="w-4 h-4 mr-2" />
            Rechercher des films
          </Button>
        </Link>
        <Link href="/watchlist">
          <Button
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
          >
            <Film className="w-4 h-4 mr-2" />
            Ma liste complète
          </Button>
        </Link>
        <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
          <Star className="w-4 h-4 mr-2" />
          Films recommandés
        </Button>
      </CardContent>
    </Card>
  )
}
