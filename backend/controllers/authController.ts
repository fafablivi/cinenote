import { hashPassword, validatePassword } from "../lib/passwordUtils";
import { createCinephile, getCinephileByField } from "../services/cinephileService";
import { generateJWT } from "../lib/jwtUtils";
import type { Context } from "hono";
import { HTTP_STATUS } from "../lib/httpStatus";

export const register = async (c: Context): Promise<Response> => {
    try {
        const { email, name, password } = await c.req.json();
        const cinephileEmail = await getCinephileByField("email", email);

        if (cinephileEmail) {
            return c.json(
                { error: "Cette adresse e-mail est déjà utilisée" },
                HTTP_STATUS.BAD_REQUEST
            );
        }
        const cinephileName = await getCinephileByField("name", name);
        if (cinephileName) {
            return c.json(
                { error: "Ce nom d'utilisateur est déjà pris" },
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const hashedPassword = await hashPassword(password);
        const cinephile = await createCinephile(name, email, hashedPassword);
        return c.json(
            {
                token: generateJWT(cinephile.id, name),
                id: cinephile.id
            },
            HTTP_STATUS.CREATED
        );
    }
    catch (error) {
        return c.json(
            { error: "Erreur lors de la création du cinéphile: " + (error instanceof Error ? error.message : "Erreur inconnue") },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
}

export const login = async (c: Context): Promise<Response> => {
    try {
        const { identifier, password } = await c.req.json();
        const cinephile = await getCinephileByField("email", identifier) ||
            await getCinephileByField("name", identifier);

        if (!cinephile) {
            return c.json(
                { error: "Cinéphile non trouvé" },
                HTTP_STATUS.BAD_REQUEST
            );
        }

        const isPasswordValid = await validatePassword(password, cinephile.password);
        if (!isPasswordValid) {
            return c.json(
                { error: "Mot de passe incorrect" },
                HTTP_STATUS.BAD_REQUEST
            );
        }

        return c.json(
            {
                token: generateJWT(cinephile.id, cinephile.name),
                id: cinephile.id,
            },
            HTTP_STATUS.OK
        );
    } catch (error) {
        return c.json(
            { error: error instanceof Error ? error.message : "Erreur inconnue" },
            HTTP_STATUS.UNAUTHORIZED
        );
    }
}