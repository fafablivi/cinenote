import { hashPassword, validatePassword } from "@/lib/passwordUtils";
import { createCinephile, getCinephileByField } from "./cinephileService";
import { generateJWT } from "@/lib/jwtUtils";

export async function register(
    name: string,
    email: string,
    password: string
) {
    const cinephileEmail = await getCinephileByField("email", email);
    if (cinephileEmail) {
        throw new Error("Cette adresse e-mail est déjà utilisée");
    }
    const cinephileName = await getCinephileByField("name", name);
    if (cinephileName) {
        throw new Error("Ce nom d'utilisateur est déjà pris");
    }

    const hashedPassword = await hashPassword(password);
    try {
        const cinephileId = await createCinephile(name, email, hashedPassword);
        return generateJWT(cinephileId, name);
    }
    catch (error) {
        throw new Error("Erreur lors de la création du cinéphile: " + (error instanceof Error ? error.message : "Erreur inconnue"));
    }
}

export async function login(
    identifier: string,
    password: string
) {
    const cinephile = await getCinephileByField("email", identifier) ||
                      await getCinephileByField("name", identifier);

    if (!cinephile) {
        throw new Error("Cinéphile non trouvé");
    }

    const isPasswordValid = await validatePassword(password, cinephile.password);
    if (!isPasswordValid) {
        throw new Error("Mot de passe incorrect");
    }

    return generateJWT(cinephile.id, cinephile.name);
}