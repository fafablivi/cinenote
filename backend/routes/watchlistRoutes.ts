import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth";
import { addMovie, addRating, deleteMovie, getWatchlist, setWatched, getWatchlistStats } from "../controllers/watchlistController";

export const watchlistRoutes = (app: Hono) => {
    app.use("/watchlist/*", authMiddleware);
    
    app.post("/watchlist/:movieId", addMovie);
    app.get("/watchlist/:cinephileId", getWatchlist);
    app.delete("/watchlist/:movieId", deleteMovie);
    app.patch("/watchlist/:movieId", setWatched);
    app.post("/watchlist/:movieId/rate", addRating);
    app.get("/watchlist/stats/:cinephileId", getWatchlistStats);

};

export default watchlistRoutes;