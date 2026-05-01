import { fetchMovieDetail } from "@/lib/movieDetailCache";
import type { MovieDetail } from "@/interfaces/movie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Loader from "@/components/commons/Loader";
import { EmptyState } from "@/components/commons/EmptyState";

import Backdrop from "@/components/movies/Backdrop";
import PosterSection from "@/components/movies/PosterSection";
import MovieInfo from "@/components/movies/MovieInfo";
import CastList from "@/components/movies/CastList";
import TrailerModal from "@/components/movies/TrailerModal";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/";

export default function MovieDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [backdropReady, setBackdropReady] = useState(false);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;

    setLoading(true);
    setBackdropReady(false);

    fetchMovieDetail(id)
      .then((data) => setMovie(data as MovieDetail))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!movie) return <EmptyState />;

  const backdropPath = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE}w1280${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE}w500${movie.poster_path}`
    : null;

  const year = movie.release_date?.slice(0, 4) ?? "N/A";
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : "N/A";

  const budget = movie.budget
    ? `$${(movie.budget / 1_000_000).toFixed(0)}M`
    : "N/A";

  const revenue = movie.revenue
    ? `$${(movie.revenue / 1_000_000).toFixed(0)}M`
    : "N/A";

  return (
    <div style={{ background: "#080A0D", color: "#fff", minHeight: "100vh", position: "relative" }}>

      {/* BACKDROP */}
      <Backdrop
        backdropPath={backdropPath}
        ready={backdropReady}
        onLoad={() => setBackdropReady(true)}
      />

      {/* BACK BUTTON (RESTORED) */}
      <div style={{
        position: "relative",
        zIndex: 5,
        padding: "30px 40px"
      }}>
        <button
          onClick={() => router.push("/movies")}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.5)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            cursor: "pointer"
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.color = "#E2D609")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
          }
        >
          ← Back to Movies
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{
        display: "flex",
        gap: 60,
        padding: "0 40px",
        position: "relative",
        zIndex: 2
      }}>

        <PosterSection
          posterUrl={posterUrl}
          title={movie.title}
          rating={movie.vote_average}
          votes={movie.vote_count}
        />

        <MovieInfo
          movie={movie}
          year={year}
          runtime={runtime}
          budget={budget}
          revenue={revenue}
          onPlay={() => setShowTrailer(true)}
        />
      </div>

      {/* CAST */}
      <div style={{ padding: "60px 40px" }}>
        <CastList cast={movie.cast} />
      </div>

      {/* TRAILER */}
      {showTrailer && movie.trailerKey && (
        <TrailerModal
          trailerKey={movie.trailerKey}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
}