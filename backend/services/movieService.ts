import db from "../config/dbConfig";

export async function createMovie(
    tmdb_id: string,
    poster_path: string,
    title: string,
    description: string,
    release_date: string,
) {
    try {
        const newMovie = {
            tmdb_id,
            poster_path,
            title,
            description,
            release_date,
        };
        const [id] = await db("movie").insert(newMovie).returning("id");
        return id;
    } catch (error) {
        throw new Error("Erreur lors de la création du film: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}

export async function getMovieById(movieId: string) {
    try {
        const movie = await db("movie").where({ id: movieId }).first();
        if (!movie) {
            throw new Error("Film non trouvé");
        }
        return movie;
    } catch (error) {
        throw new Error("Erreur lors de la récupération du film: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}

export async function getMovieByField(field:string, value: string) {
    try {
        const movie = await db("movie").where(field, value).first();
        if (!movie) {
            return null;
        }
        return movie;
    } catch (error) {
        throw new Error("Erreur lors de la récupération du film: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}

export async function getAllMovies() {
    try {
        const movies = await db("movie").select("*");
        return movies;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des films: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}