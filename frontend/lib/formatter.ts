import { genres } from "./constants";

export function getGenreName(genreId: number): string {
    return genres.find((g) => g.id === genreId)?.name || "Inconnu";
}