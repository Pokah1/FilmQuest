import { cache } from "@/lib/cache";
import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

interface UseMoviesReturn {
  movies: MoviesProps[];
  loading: boolean;
  page: number;
  year: number | null;
  genre: string;
  search: string;
  error: string | null;
  setPage: (page: number) => void;
  setYear: (year: number | null) => void;
  setGenre: (genre: string) => void;
  setSearch: (query: string) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

export function useMovies(): UseMoviesReturn {
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState<number | null>(null);
  const [genre, setGenre] = useState<string>("");
  const [search, setSearchState] = useState<string>("");
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    const cacheKey = `movies:${page}:${year}:${genre}:${search}`;

    const cached = cache.get<MoviesProps[]>(cacheKey);
    if (cached) {
      setMovies(cached);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/fetch-movies", {
        method: "POST",
        body: JSON.stringify({ page, year, genre, search }),
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Failed to fetch movies");
        setMovies([]);
        return;
      }

      const results = data.movies ?? [];
      cache.set(cacheKey, results);
      setMovies(results);
    } catch (err) {
      console.error("useMovies error:", err);
      setError("Network error");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [page, year, genre, search]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSetYear = (newYear: number | null) => { setPage(1); setYear(newYear); };
  const handleSetGenre = (newGenre: string) => { setPage(1); setGenre(newGenre); };

  // Debounce search — wait 500ms after user stops typing before fetching
  const handleSetSearch = useCallback((query: string) => {
    setPage(1);
    setSearchState(query);
  }, []);

  return {
    movies, loading, page, year, genre, search, error,
    setPage,
    setYear: handleSetYear,
    setGenre: handleSetGenre,
    setSearch: handleSetSearch,
    goToNextPage: () => setPage((p) => p + 1),
    goToPrevPage: () => setPage((p) => (p > 1 ? p - 1 : 1)),
  };
}