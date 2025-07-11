import type { Context } from "hono";
import { HTTP_STATUS } from "../lib/httpStatus";
import { tmdbGetMovieDetails, tmdbSearchMovie } from "../services/tmdbService";
import { getAllMovies } from "../services/movieService";

export const searchMovie = async (c: Context): Promise<Response> => {
    try {
        const { searchedTitle } = await c.req.query();
        if (!searchedTitle) {
            return c.json(
                { error: "Le titre du film est requis" },
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const result = await tmdbSearchMovie(searchedTitle);

        return c.json(result, HTTP_STATUS.OK);
    } catch (error) {
        return c.json(
            { error: "Erreur lors de la recherche du film: " + (error instanceof Error ? error.message : "Erreur inconnue") },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
}

export const getMovieDetails = async (c: Context): Promise<Response> => {
    try {
        const { id } = c.req.param();
        const movieDetails = await tmdbGetMovieDetails(id);
        if (!movieDetails) {
            return c.json(
                { error: "Film non trouvé" },
                HTTP_STATUS.NOT_FOUND
            );
        }
        return c.json(movieDetails, HTTP_STATUS.OK);
    } catch (error) {
        return c.json(
            { error: "Erreur lors de la récupération des détails du film: " + (error instanceof Error ? error.message : "Erreur inconnue") },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
}

export const getMovies = async (c: Context): Promise<Response> => {
    try {
        const movies = await getAllMovies();
        if (!movies) {
            return c.json(
                { error: "Aucun film trouvé" },
                HTTP_STATUS.NOT_FOUND
            );
        }
        return c.json(movies, HTTP_STATUS.OK);
    } catch (error) {
        return c.json(
            { error: "Erreur lors de la récupération des films: " + (error instanceof Error ? error.message : "Erreur inconnue") },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
}