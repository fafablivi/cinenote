async function getFromTMDb(params: string) {
    const url = `https://api.themoviedb.org/3${params}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_API_KEY || ""}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la communication avec TMDb");
    }

    return response.json();
}

export async function tmdbSearchMovie(searchedTitle: string) {
    try {
        const data = await getFromTMDb(`/search/movie?query=${searchedTitle}&language=fr-FR&primary_release_year=fr`);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la recherche d'un film depuis TMDb");
    }
}

export async function tmdbGetMovieDetails(tmdbId: string) {
    try {
        const data = await getFromTMDb(`/movie/${tmdbId}?language=fr`);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la récupération des détails du film depuis TMDb");
    }
}

export async function tmdbGetPopularMovies() {
    try {
        const data = await getFromTMDb(`/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc`);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Erreur lors de la récupération des crédits du film depuis TMDb");
    }
}