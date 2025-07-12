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
            .select("watchlist.*", "movie.title", "movie.description", "movie.release_date", "movie.tmdb_id", "movie.poster_path");
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

export async function setMovieAsWatched(
    cinephileId: string,
    movieId: string,
    watched: boolean = true,
) {
    try {
        const updatedCount = await db("watchlist")
            .where({ cinephile_id: cinephileId, movie_id: movieId })
            .update({ watched });
        if (updatedCount === 0) {
            throw new Error("Aucun film trouvé dans la watchlist pour ce cinéphile");
        }
        return updatedCount;
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du film dans la watchlist: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}

export async function addRatingToMovie(
    cinephileId: string,
    movieId: string,
    rating: number,
) {
    try {
        const existingEntry = await db("watchlist")
            .where({ cinephile_id: cinephileId, movie_id: movieId })
            .first();

        if (!existingEntry) {
            throw new Error("Le film n'est pas dans la watchlist de ce cinéphile");
        }

        const updatedEntry = await db("watchlist")
            .where({ cinephile_id: cinephileId, movie_id: movieId })
            .update({
                rating,
                updated_at: new Date(),
            });

        if (updatedEntry === 0) {
            throw new Error("Erreur lors de la mise à jour de la note du film");
        }

        return updatedEntry;
    } catch (error) {
        throw new Error("Erreur lors de l'ajout de la note au film: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}

export async function getStats(cinephileId: string) {
    try {
        const rawStats = await db("watchlist")
            .join("movie", "watchlist.movie_id", "movie.id")
            .where("watchlist.cinephile_id", cinephileId)
            .select(
                db.raw("COUNT(watchlist.movie_id) as totalMovies"),
                db.raw("SUM(CASE WHEN watchlist.watched THEN 1 ELSE 0 END) as watchedMovies"),
                db.raw("AVG(watchlist.rating) as averageRating"),
                db.raw("SUM(CASE WHEN watchlist.created_at >= DATE_TRUNC('month', NOW()) THEN 1 ELSE 0 END) as thisMonth"),
                db.raw("COUNT(watchlist.rating) as totalRatings")
            )
            .first();

        const stats = {
            totalMovies: Number(rawStats.totalmovies),
            watchedMovies: Number(rawStats.watchedmovies),
            averageRating: Number(rawStats.averagerating),
            thisMonth: Number(rawStats.thismonth),
            totalRatings: Number(rawStats.totalratings),
        };

        return stats;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des statistiques de la watchlist: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}
