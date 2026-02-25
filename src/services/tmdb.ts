const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface MediaItem {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

export const getTrendingMovies = async (): Promise<MediaItem[]> => {
  if (!TMDB_API_KEY) return [];
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=pt-BR`
    );
    const data = await response.json();
    return data.results.map((item: any) => ({
      id: item.id,
      title: item.title,
      poster_path: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : null,
      vote_average: item.vote_average,
    }));
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export const getPopularSeries = async (): Promise<MediaItem[]> => {
  if (!TMDB_API_KEY) return [];
  try {
    const response = await fetch(
      `${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=pt-BR`
    );
    const data = await response.json();
    return data.results.map((item: any) => ({
      id: item.id,
      title: item.name, // Series use 'name' instead of 'title'
      poster_path: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : null,
      vote_average: item.vote_average,
    }));
  } catch (error) {
    console.error("Error fetching popular series:", error);
    return [];
  }
};
