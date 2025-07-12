export interface Movie {
    id: string
    title: string
    release_date: string
    genre_ids: number[]
    poster_path: string
    vote_average: number
    overview: string
}

export interface WatchlistMovie {
    id: string;
    cinephile_id: string;
    movie_id: string;
    watched: boolean;
    rating?: number;
    comment?: string;
    updated_at: string;
    created_at: string;
    title: string;
    description: string;
    release_date: string;
    tmdb_id: string;
    poster_path: string;
}