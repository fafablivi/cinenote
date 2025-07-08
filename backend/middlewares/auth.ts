import type { MiddlewareHandler } from "hono";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../lib/httpStatus";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const authHeader = c.req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return c.json({ error: "Token manquant" }, HTTP_STATUS.UNAUTHORIZED);
    }

    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey)
            return c.json({ error: "Clé secrète introuvable" }, HTTP_STATUS.INTERNAL_SERVER_ERROR);

        jwt.verify(token, secretKey);
        await next();
    } catch {
        return c.json({ error: "Token invalide" }, HTTP_STATUS.FORBIDDEN);
    }
};
