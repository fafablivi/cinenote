import { Hono } from "hono";
import { searchMovie, getMovieDetails, getMovies } from "../controllers/movieController";

export const movieRoutes = (app: Hono) => {
    app.get("/movie/search", searchMovie);
    app.get("/movie/:id", getMovieDetails);
    app.get("/movie", getMovies);
};

export default movieRoutes;