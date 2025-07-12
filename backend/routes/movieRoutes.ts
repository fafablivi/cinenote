import { Hono } from "hono";
import { searchMovie, getMovieDetails, getMovies, getPopularMovies } from "../controllers/movieController";

export const movieRoutes = (app: Hono) => {
    app.get("/movie/search", searchMovie);
    app.get("/movie/details/:id", getMovieDetails);
    app.get("/movie", getMovies);
    app.get("/movie/popular", getPopularMovies);
};

export default movieRoutes;