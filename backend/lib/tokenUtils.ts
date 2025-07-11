import type { Context } from "hono";
import { getCinephileByToken } from "./jwtUtils";

export function getToken(c: Context){
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
        return null;
    }
    
    const token = authHeader.split(" ")[1];
    if (!token) {
        return null;
    }
    
    return token;
}

export function getCinephileIdFromToken(c: Context): string | null {
    const token = getToken(c);
    if (!token) {
        return null;
    }

    const cinephile = getCinephileByToken(token);
    if (!cinephile || !cinephile.id) {
        return null;
    }
    
    return cinephile.id;
}