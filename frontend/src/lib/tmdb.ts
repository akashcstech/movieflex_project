const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "333f3fe953605f3bf8bd08987cb5adc0";
export const IMAGE_BASE = "https://image.tmdb.org/t/p";
export const BACKDROP_BASE = "https://image.tmdb.org/t/p/original";

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date: string;
}

interface TMDBResponse {
    results: Movie[];
    page: number;
    total_results: number;
    total_pages: number;
}

async function fetchTMDB(endpoint: string): Promise<Movie[]> {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            const errorData = await res.json();
            console.error(`TMDB API Error ${res.status}:`, errorData);
            throw new Error(`TMDB request failed: ${res.status}`);
        }
        const data: TMDBResponse = await res.json();

        if (!data.results || !Array.isArray(data.results)) {
            console.error(`Unexpected TMDB response structure for ${endpoint}:`, data);
            return [];
        }

        return data.results;
    } catch (error) {
        console.error(`Fetch error for ${endpoint}:`, error);
        throw error;
    }
}

export const getTrending = () => fetchTMDB("/trending/movie/week");
export const getPopular = () => fetchTMDB("/movie/popular");
export const getTopRated = () => fetchTMDB("/movie/top_rated");
export const getUpcoming = () => fetchTMDB("/movie/upcoming");
