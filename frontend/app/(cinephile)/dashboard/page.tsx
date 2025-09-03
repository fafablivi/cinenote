"use client"

import { WelcomeSection } from "@/components/features/dashboard/WelcomeSection"
import { DashboardStats } from "@/components/features/dashboard/DashboardStats"
import { QuickActions } from "@/components/features/dashboard/QuickActions"
import { RecentMovies } from "@/components/features/dashboard/RecentMovies"
import { PopularMovies } from "@/components/features/dashboard/PopularMovies"
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
