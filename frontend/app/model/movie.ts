export interface Movie {
    id: string
    title: string
    release_date: number
    genre_ids: number[]
    poster_path: string
    vote_average: number
    overview: string
    runtime?: number
}