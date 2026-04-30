/**
 * Thin wrapper around the generic cache specifically for movie details.
 * Cached per movie ID so revisiting a detail page never refetches.
 */
import { cache } from "@/lib/cache";

export async function fetchMovieDetail(id: string | number) {
  const cacheKey = `movie-detail:${id}`;

  const cached = cache.get<unknown>(cacheKey);
  if (cached) {
    console.log(`[cache hit] ${cacheKey}`);
    return cached;
  }

  const response = await fetch(`/api/movie-detail?id=${id}`);
  if (!response.ok) throw new Error("Failed to fetch movie detail");

  const data = await response.json();
  cache.set(cacheKey, data);
  return data;
}