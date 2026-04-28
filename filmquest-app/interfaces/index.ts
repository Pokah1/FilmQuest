import { ReactNode } from "react";

// ─── Layout ────────────────────────────────────────────────────────────────

export interface ComponentProps {
  children: ReactNode;
}

// ─── UI Components ─────────────────────────────────────────────────────────

export interface ButtonProps {
  title: string;
  action?: () => void;
}

// ─── TMDB API response shape ───────────────────────────────────────────────

/** Raw shape returned by TMDB /discover/movie */
export interface MoviesProps {
  id: number;
  title: string;
  poster_path: string | null;   // e.g. "/abc123.jpg" — prepend TMDB image base URL
  release_date: string;         // e.g. "2024-03-01"
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

// ─── UI card props (flattened for <MovieCard>) ─────────────────────────────

export interface MovieProps {
  id?: number;
  posterImage: string | null;
  releaseYear: string;
  title: string;
}

// ─── Page-level props ──────────────────────────────────────────────────────

export interface MoviesPageProps {
  movies: MoviesProps[];
}