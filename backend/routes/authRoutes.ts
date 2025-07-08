import { Hono } from "hono";
import { login, register } from "../controllers/authController";

export const authRoutes = (app: Hono) => {
    app.post("/register", register);
    app.post("/login", login);
};

export default authRoutes;