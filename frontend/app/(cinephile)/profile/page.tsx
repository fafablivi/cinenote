"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Mail, User } from "lucide-react"
import { useCinephile } from "@/hooks/useCinephile"

export default function ProfilePage() {
    const { cinephile, isLoading, error } = useCinephile();

    useEffect(() => {
        document.title = "CinéNote - Mon Profil";
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-slate-300">Chargement du profil...</div>
            </div>
        )
    }

    if (error || !cinephile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <Card className="w-full max-w-md border-red-500 bg-slate-800/50 backdrop-blur">
                    <CardContent className="pt-6 text-center">
                        <div className="text-red-400">{error || "Profil non trouvé"}</div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
            <div className="container mx-auto max-w-2xl">
                <Card className="border-slate-700 bg-slate-800/50 backdrop-blur">
                    <CardHeader className="text-center pb-4">
                        <div className="flex justify-center mb-4">
                            <Avatar className="w-24 h-24 border-4 border-slate-600">
                                <AvatarImage src={cinephile?.profile_picture || "/placeholder.svg"} alt={cinephile.name} />
                                <AvatarFallback className="bg-slate-700 text-blue-400 text-2xl">
                                    {cinephile.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="text-2xl text-white">{cinephile.name}</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-3 text-slate-300">
                            <Mail className="w-5 h-5 text-blue-400" />
                            <span>{cinephile.email}</span>
                        </div>

                        <Separator className="bg-slate-600" />

                        {cinephile.biography && (
                            <>
                                <div>
                                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <User className="w-5 h-5 text-blue-400" />
                                        Biographie
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed">{cinephile.biography}</p>
                                </div>
                                <Separator className="bg-slate-600" />
                            </>
                        )}

                        <div className="flex items-center gap-3 text-slate-300">
                            <CalendarDays className="w-5 h-5 text-blue-400" />
                            <span>Membre depuis le {formatDate(cinephile.created_at)}</span>
                        </div>

                        <div className="pt-4">
                            <Badge variant="secondary" className="bg-blue-900/50 text-blue-300 border-blue-700">
                                Cinéphile
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
