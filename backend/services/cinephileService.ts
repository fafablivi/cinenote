import db from "@/config/dbConfig";

export async function getCinephileById(cinephileId: string) {
    try {
        const cinephile = await db("cinephile").where({ id: cinephileId }).first();
        if (!cinephile) {
            throw new Error("Cinéphile non trouvé");
        }
        return cinephile;
    } catch (error) {
        throw new Error("Erreur lors de la récupération du cinéphile: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}

export async function getCinephileByField(field: string, value: string) {
    const cinephile = await db("cinephile").where(field, value).first();
    return cinephile;
}

export async function getCinephiles() {
    try {
        const cinephiles = await db("cinephile").select("*");
        return cinephiles;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des cinéphiles: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}

export async function createCinephile(
    name: string,
    email: string,
    hashedPassword: string
) {
    try {
        const newCinephile = {
            name,
            email,
            password: hashedPassword,
        };
        const [id] = await db("cinephile").insert(newCinephile).returning("id");
        if (!id) {
            throw new Error("Erreur lors de la création du cinéphile");
        }
        return id;
    } catch (error) {
        throw new Error("Erreur lors de la création du cinéphile: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}

export async function updateCinephile(
    cinephileId: string,
    updates: Partial<{ name: string; email: string; password: string, biography: string, profile_picture: string }>,
) {
    try {
        const updatedCinephile = await db("cinephile")
            .where({ id: cinephileId })
            .update(updates)
            .returning("*");
        if (!updatedCinephile || updatedCinephile.length === 0) {
            throw new Error("Erreur lors de la mise à jour du cinéphile");
        }
        return updatedCinephile[0];
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du cinéphile: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}