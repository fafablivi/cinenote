import type { Context } from "hono";
import { getCinephileById } from "../services/cinephileService";
import { HTTP_STATUS } from "../lib/httpStatus";

export const getCinephile = async (c: Context): Promise<Response> => {
    try {
        const cinephileId = c.req.param("id");
        const cinephile = await getCinephileById(cinephileId);

        if (!cinephile) {
            return c.json(
                { error: "Cinéphile non trouvé" },
                HTTP_STATUS.NOT_FOUND
            );
        }

        return c.json(cinephile, HTTP_STATUS.OK);
    } catch (error) {
        return c.json(
            { error: "Erreur lors de la récupération du cinéphile: " + (error instanceof Error ? error.message : "Erreur inconnue") },
            HTTP_STATUS.INTERNAL_SERVER_ERROR
        );
    }
}