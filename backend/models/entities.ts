export interface Cinephile{
    id: string;
    name: string;
    email: string;
    password: string;
    profilePicture?: string;
    biography?: string;
    createdAt: Date;
}

export interface Movie {
    id: number;
    tmdbId: number;
    posterPath?: string;
    title: string;
    description?: string;
    releaseDate?: Date;
    createdAt: Date;
}

export interface Watchlist {
    id: number;
    cinephileId: number;
    movieId: number;
    createdAt: Date;
}

export interface Review {
    id: number;
    movieId: number;
    cinephileId: number;
    rating: number;
    comment?: string;
    createdAt: Date;
}