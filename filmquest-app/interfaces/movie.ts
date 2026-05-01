export interface Genre {
    id: number; 
    name: string;
}

export interface CastMember {
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  cast: CastMember[];
  trailerKey: string | null;
  status: string;
  budget: number;
  revenue: number;
}