import Stat from "@/components/commons/Stat";
import WatchLinks from "./Watchlinks";
import type { MovieDetail } from "@/interfaces/movie";

interface Props {
  movie: MovieDetail;
  year: string;
  runtime: string;
  budget: string;
  revenue: string;
  onPlay: () => void;
}

export default function MovieInfo({ movie, year, runtime, budget, revenue, onPlay }: Props) {
  return (
    <div style={{ flex: 1, minWidth: 0, animation: "slideUp 0.8s 0.2s ease both" }}>

      {/* Genres */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {movie.genres.map((g) => (
          <span key={g.id} style={{
            padding: "4px 12px", borderRadius: 2,
            border: "1px solid rgba(226,214,9,0.25)",
            background: "rgba(226,214,9,0.07)",
            fontSize: 10, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#E2D609",
            fontFamily: "sans-serif",
          }}>
            {g.name}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1 style={{
        margin: "0 0 8px",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(2.4rem, 8vw, 5.5rem)",
        fontWeight: 400, lineHeight: 0.92,
        letterSpacing: "0.02em",
        wordBreak: "break-word",
      }}>
        {movie.title}
      </h1>

      {/* Tagline */}
      {movie.tagline && (
        <p style={{
          margin: "0 0 20px",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 300,
          fontSize: "clamp(0.95rem, 2.5vw, 1.3rem)",
          color: "rgba(255,255,255,0.4)", lineHeight: 1.5,
        }}>
          &quot;{movie.tagline}&quot;
        </p>
      )}

      {/* Meta row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        {[year, runtime].map((val, i) => (
          <span key={i} style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: 10 }}>
            {i > 0 && <span style={{ opacity: 0.3 }}>·</span>}
            {val}
          </span>
        ))}
        <span style={{
          padding: "3px 10px", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 2, fontSize: 10,
          color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", fontFamily: "sans-serif",
        }}>
          {movie.status}
        </span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "sans-serif" }}>
          {movie.vote_count.toLocaleString()} votes
        </span>
      </div>

      {/* Overview */}
      <p style={{
        margin: "0 0 28px",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
        fontWeight: 300, lineHeight: 1.85,
        color: "rgba(255,255,255,0.65)",
      }}>
        {movie.overview}
      </p>

      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 10, marginBottom: 28,
      }}>
        <Stat label="Budget" value={budget} />
        <Stat label="Box Office" value={revenue} />
        <Stat label="Runtime" value={runtime} />
        <Stat label="Year" value={year} />
      </div>

      {/* Trailer button */}
      {movie.trailerKey && (
        <button
          onClick={onPlay}
          style={{
            padding: "12px 26px",
            border: "1px solid #E2D609",
            background: "transparent", color: "#E2D609",
            fontSize: 12, letterSpacing: "0.2em",
            textTransform: "uppercase", cursor: "pointer",
            transition: "all 0.3s", borderRadius: 2,
            width: "100%", maxWidth: 240,
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = "#E2D609"; e.currentTarget.style.color = "#000"; }}
          onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#E2D609"; }}
        >
          ▶ Watch Trailer
        </button>
      )}

      {/* Where to watch — shows after trailer button */}
      <WatchLinks
        imdbId={movie.imdb_id}
        tmdbWatchUrl={movie.tmdbWatchUrl}
        watchProviders={movie.watchProviders}
        movieId={movie.id}
      />
    </div>
  );
}