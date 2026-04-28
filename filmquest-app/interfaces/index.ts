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

// ─── API response shape (from moviesdatabase RapidAPI) ─────────────────────

interface PrimaryImage {
  url: string | null;
}

interface TitleText {
  text: string;
}

interface ReleaseYear {
  year: string;
}

/** Raw shape returned by the RapidAPI moviesdatabase endpoint */
export interface MoviesProps {
  id: string;
  primaryImage: PrimaryImage | null;
  titleText: TitleText;
  releaseYear: ReleaseYear;
}

// ─── UI card props (flattened from MoviesProps for display) ─────────────────

/** Flat props used by <MovieCard> after mapping from MoviesProps */
export interface MovieProps {
  id?: string;
  posterImage: string | null;
  releaseYear: string;
  title: string;
}

// ─── Page-level props ──────────────────────────────────────────────────────

export interface MoviesPageProps {
  movies: MoviesProps[];
}