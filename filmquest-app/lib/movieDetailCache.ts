import { cache } from "@/lib/cache";
import type { MovieDetail } from "@/interfaces/movie";

export async function fetchMovieDetail(id: string): Promise<MovieDetail> {
  const cacheKey = `movie-detail:${id}`;

  const cached = cache.get<MovieDetail>(cacheKey);
  if (cached) {
    console.log(`[cache hit] ${cacheKey}`);
    return cached;
  }

  const response = await fetch(`/api/movie-detail?id=${id}`);
  if (!response.ok) throw new Error("Failed to fetch movie detail");

  const data: MovieDetail = await response.json();

  cache.set(cacheKey, data);
  return data;
}