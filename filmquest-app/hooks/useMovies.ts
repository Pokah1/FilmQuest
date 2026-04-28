import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

interface UseMoviesReturn {
  movies: MoviesProps[];
  loading: boolean;
  page: number;
  year: number | null;
  genre: string;
  setPage: (page: number) => void;
  setYear: (year: number | null) => void;
  setGenre: (genre: string) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
}

export function useMovies(): UseMoviesReturn {
  const [page, setPage] = useState<number>(1);
  const [year, setYear] = useState<number | null>(null);
  const [genre, setGenre] = useState<string>("All");
  const [movies, setMovies] = useState<MoviesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/fetch-movies", {
        method: "POST",
        body: JSON.stringify({
          page,
          year,
          genre: genre === "All" ? "" : genre,
        }),
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });

      if (!response.ok) throw new Error("Failed to fetch movies");

      const data = await response.json();
      setMovies(data.movies ?? []);
    } catch (error) {
      console.error("useMovies error:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [page, year, genre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Reset to page 1 when filters change
  const handleSetYear = (newYear: number | null) => {
    setPage(1);
    setYear(newYear);
  };

  const handleSetGenre = (newGenre: string) => {
    setPage(1);
    setGenre(newGenre);
  };

  return {
    movies,
    loading,
    page,
    year,
    genre,
    setPage,
    setYear: handleSetYear,
    setGenre: handleSetGenre,
    goToNextPage: () => setPage((p) => p + 1),
    goToPrevPage: () => setPage((p) => (p > 1 ? p - 1 : 1)),
  };
}