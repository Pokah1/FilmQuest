import Stat from "@/components/commons/Stat";
import type { MovieDetail } from "@/interfaces/movie";

interface Props {
  movie: MovieDetail;
  year: string;
  runtime: string;
  budget: string;
  revenue: string;
  onPlay: () => void;
}

export default function MovieInfo({
  movie,
  year,
  runtime,
  budget,
  revenue,
  onPlay,
}: Props) {
  return (
    <div style={{ flex: 1, minWidth: 280 }}>

      {/* GENRES */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 18,
        animation: "slideUp 0.7s ease both"
      }}>
        {movie.genres.map((g) => (
          <span
            key={g.id}
            style={{
              padding: "4px 14px",
              borderRadius: 2,
              border: "1px solid rgba(226,214,9,0.25)",
              background: "rgba(226,214,9,0.07)",
              fontSize: 10,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#E2D609",
              fontFamily: "sans-serif",
            }}
          >
            {g.name}
          </span>
        ))}
      </div>

      {/* TITLE */}
      <h1 style={{
        margin: "0 0 6px",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(3rem, 6vw, 6rem)",
        fontWeight: 400,
        lineHeight: 0.9,
        letterSpacing: "0.02em",
      }}>
        {movie.title}
      </h1>

      {/* TAGLINE */}
      {movie.tagline && (
        <p style={{
          margin: "0 0 28px",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
          color: "rgba(255,255,255,0.45)",
        }}>
          &quot;{movie.tagline}&quot;
        </p>
      )}

      {/* META ROW */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        flexWrap: "wrap",
        marginBottom: 28,
      }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{year}</span>
        <span style={{ opacity: 0.3 }}>·</span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{runtime}</span>
        <span style={{ opacity: 0.3 }}>·</span>

        <span style={{
          padding: "3px 12px",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 2,
          fontSize: 11,
          color: "rgba(255,255,255,0.45)",
          letterSpacing: "0.08em"
        }}>
          {movie.status}
        </span>

        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          {movie.vote_count.toLocaleString()} votes
        </span>
      </div>

      {/* OVERVIEW */}
      <p style={{
        margin: "0 0 32px",
        maxWidth: 600,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
        fontWeight: 300,
        lineHeight: 1.9,
        color: "rgba(255,255,255,0.65)",
      }}>
        {movie.overview}
      </p>

      {/* STATS */}
      <div style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        marginBottom: 36
      }}>
        <Stat label="Budget" value={budget} />
        <Stat label="Box Office" value={revenue} />
        <Stat label="Runtime" value={runtime} />
        <Stat label="Year" value={year} />
      </div>

      {/* TRAILER BUTTON */}
      {movie.trailerKey && (
        <button
  onClick={onPlay}
  style={{
    marginTop: 20,
    padding: "12px 26px",
    border: "1px solid #E2D609",
    background: "transparent",
    color: "#E2D609",
    fontSize: 12,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "0.3s"
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.background = "#E2D609";
    e.currentTarget.style.color = "#000";
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "#E2D609";
  }}
>
  ▶ Watch Trailer
</button>
      )}
    </div>
  );
}