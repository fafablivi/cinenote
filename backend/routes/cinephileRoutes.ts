import { Hono } from "hono";
import { getCinephile } from "../controllers/cinephileController";
import { authMiddleware } from "../middlewares/auth";

export const cinephileRoutes = (app: Hono) => {
    app.use("/cinephile/*", authMiddleware);
    
    app.get("/cinephile/:id", getCinephile);
};

export default cinephileRoutes;