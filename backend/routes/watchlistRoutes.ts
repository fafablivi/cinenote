import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth";
import { addMovie, deleteMovie, getWatchlist } from "../controllers/watchlistController";

export const watchlistRoutes = (app: Hono) => {
    app.use("/watchlist/*", authMiddleware);
    
    app.post("/watchlist/:movieId", addMovie);
    app.get("/watchlist/:cinephileId", getWatchlist);
    app.delete("/watchlist/:movieId", deleteMovie);

};

export default watchlistRoutes;