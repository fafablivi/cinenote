import { Hono } from "hono";
import authRoutes from "./authRoutes";
import cinephileRoutes from "./cinephileRoutes";

export const appRoutes = (app: Hono) => {
    authRoutes(app);
    cinephileRoutes(app);
};

export default appRoutes;