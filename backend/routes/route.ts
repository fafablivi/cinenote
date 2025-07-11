import { Hono } from "hono";
import authRoutes from "./authRoutes";
import cinephileRoutes from "./cinephileRoutes";
import movieRoutes from "./movieRoutes";
import watchlistRoutes from "./watchlistRoutes";

export const appRoutes = (app: Hono) => {
    authRoutes(app);
    cinephileRoutes(app);
    movieRoutes(app);
    watchlistRoutes(app);
};

export default appRoutes;