import type { Context } from "hono";
import { HTTP_STATUS } from "../lib/httpStatus";
import { addMovieToWatchlist, addRatingToMovie, deleteMovieFromWatchlist, getStats, getWatchlistByCinephileId, setMovieAsWatched } from "../services/watchlistService";
import { getCinephileIdFromToken } from "../lib/tokenUtils";

export const getWatchlist = async (c: Context): Promise<Response> => {
    try {
        const cinephileId = c.req.param("cinephileId");
        if (!cinephileId) {
            return c.json(
                { error: "Le champ cinephileId est manquant" },
                HTTP_STATUS.BAD_REQUEST
            );
        }
        const watchlist = await getWatchlistByCinephileId(cinephileId);
        if (!watchlist) {
            return c.json(
                { error: "Watchlist non trouvée pour ce cinéphile" },
                HTTP_STATUS.NOT_FOUND
            );
        }
        return c.json(
            { movies: watchlist },
            HTTP_STATUS.OK
        );
    } catch (error) {
        return c.json(
            { error: "Erreur lors de la récupération de la watchlist: " + (error instanceof Error ? error.message : "Erreur inconnue") },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
}

export const addMovie = async (c: Context): Promise<Response> => {
    try {
        const movieId = c.req.param("movieId");
        const cinephileId = getCinephileIdFromToken(c);

        if (!movieId || !cinephileId) {
            return c.json(
                { error: "Les champs movieId et cinephileId sont manquants" },
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const movie = await addMovieToWatchlist(cinephileId, movieId);

        return c.json(
            {
                message: "Film ajouté à la watchlist avec succès"
                , movieId: movie
            },
            201
        );
    } catch (error) {
        return c.json(
            { error: "Erreur lors de l'ajout du film à la watchlist: " + (error instanceof Error ? error.message : "Erreur inconnue") },
            500
        );
    }
}

export const deleteMovie = async (c: Context): Promise<Response> => {
    try {
        const movieId = c.req.param("movieId");
        const cinephileId = getCinephileIdFromToken(c);

        if (!movieId || !cinephileId) {
            return c.json(
                { error: "Les champs movieId et cinephileId sont manquants" },
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const deletedCount = await deleteMovieFromWatchlist(cinephileId, movieId);
        if (deletedCount === 0) {
            return c.json(
                { error: "Aucun film trouvé dans la watchlist pour ce cinéphile" },
                HTTP_STATUS.NOT_FOUND
            );
        }

        return c.json(
            { message: "Film supprimé de la watchlist avec succès" },
            HTTP_STATUS.OK
        );
    } catch (error) {
        return c.json(
            { error: "Erreur lors de la suppression du film de la watchlist: " + (error instanceof Error ? error.message : "Erreur inconnue") },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
}

export const setWatched = async (c: Context): Promise<Response> => {
    try {
        const movieId = c.req.param("movieId");
        const cinephileId = getCinephileIdFromToken(c);
        const { watched } = await c.req.json();

        if (!movieId || !cinephileId || watched === undefined) {
            return c.json(
                { error: "Les champs movieId et cinephileId sont manquants" },
                HTTP_STATUS.BAD_REQUEST
            );
        }

        await setMovieAsWatched(cinephileId, movieId, watched);

        return c.json(
            { message: `Statut du film ${movieId} mis à jour avec succès` },
            HTTP_STATUS.OK
        );
    } catch (error) {
        return c.json(
            { error: "Erreur lors de la mise à jour du statut du film: " + (error instanceof Error ? error.message : "Erreur inconnue") },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
}

export const addRating = async (c: Context): Promise<Response> => {
    try {
        const body = await c.req.json();
        const movieId = c.req.param("movieId");
        const cinephileId = getCinephileIdFromToken(c);
        const rating = body.rating;

        if (!movieId || !cinephileId || typeof rating !== "number") {
            return c.json(
                { error: "Les champs movieId, cinephileId et rating sont requis" },
                HTTP_STATUS.BAD_REQUEST
            );
        }

        await addRatingToMovie(cinephileId, movieId, rating);

        return c.json(
            { message: `Note ${rating} ajoutée pour le film ${movieId}` },
            HTTP_STATUS.OK
        );

    } catch (error) {
        return c.json(
            { error: "Erreur lors de l'ajout de la note: " + (error instanceof Error ? error.message : "Erreur inconnue") },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
}

export const getWatchlistStats = async (c: Context): Promise<Response> => {
    try {
        const cinephileId = c.req.param("cinephileId");
        if (!cinephileId) {
            return c.json(
                { error: "Le champ cinephileId est manquant" },
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const stats = await getStats(cinephileId);

        return c.json(stats, HTTP_STATUS.OK);
    } catch (error) {
        return c.json(
            { error: "Erreur lors de la récupération des statistiques de la watchlist: " + (error instanceof Error ? error.message : "Erreur inconnue") },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
}