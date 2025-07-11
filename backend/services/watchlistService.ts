import db from "../config/dbConfig";
import { createMovie, getMovieByField } from "./movieService";
import { tmdbGetMovieDetails } from "./tmdbService";

export async function getWatchlistByCinephileId(
    cinephileId: string,
) {
    try {
        const watchlist = await db("watchlist")
            .join("movie", "watchlist.movie_id", "movie.id")
            .where("watchlist.cinephile_id", cinephileId)
            .select("movie.*");
        return watchlist;
    } catch (error) {
        throw new Error("Erreur lors de la récupération de la watchlist: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}

export async function addMovieToWatchlist(
    cinephileId: string,
    tmdbMovieId: string,
) {
    try {
        let movieId;
        const existingMovie = await getMovieByField("tmdb_id", tmdbMovieId);

        if (existingMovie) {
            movieId = existingMovie.id;
        } else {
            const movieDetails = await tmdbGetMovieDetails(tmdbMovieId);
            const movie = await createMovie(
                tmdbMovieId,
                movieDetails.poster_path || "",
                movieDetails.title,
                movieDetails.overview || "",
                movieDetails.release_date || "",
            );
            movieId = movie.id;
        }

        const existingEntry = await db("watchlist")
            .where({ cinephile_id: cinephileId, movie_id: movieId })
            .first();
        if (!existingEntry) {
            const watchlistEntry = {
                cinephile_id: cinephileId,
                movie_id: movieId,
            };

            const [id] = await db("watchlist").insert(watchlistEntry).returning("id");
            if (!id) {
                throw new Error("Erreur lors de l'ajout du film à la watchlist");
            }
        }

        return movieId;
    } catch (error) {
        throw new Error("Erreur lors de l'ajout du film à la watchlist: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}

export async function deleteMovieFromWatchlist(
    cinephileId: string,
    movieId: string,
) {
    try {
        const deletedCount = await db("watchlist")
            .where({ cinephile_id: cinephileId, movie_id: movieId })
            .del();
        if (deletedCount === 0) {
            throw new Error("Aucun film trouvé dans la watchlist pour ce cinéphile");
        }
        return deletedCount;
    } catch (error) {
        throw new Error("Erreur lors de la suppression du film de la watchlist: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}
