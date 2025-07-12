"use client"

import { WelcomeSection } from "@/components/dashboard/WelcomeSection"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { RecentMovies } from "@/components/dashboard/RecentMovies"
import { PopularMovies } from "@/components/dashboard/PopularMovies"
import { useWatchlist } from "@/hooks/useWatchlist"

export default function DashboardPage() {
    const { movies } = useWatchlist()

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <WelcomeSection />
            <DashboardStats />
            <QuickActions />
            <RecentMovies movies={movies} />
            <PopularMovies />
        </div>
    )
}
