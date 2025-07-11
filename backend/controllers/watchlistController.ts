import type { Context } from "hono";
import { HTTP_STATUS } from "../lib/httpStatus";
import { addMovieToWatchlist, deleteMovieFromWatchlist, getWatchlistByCinephileId } from "../services/watchlistService";
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
             watchlist ,
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