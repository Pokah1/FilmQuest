import { MovieProps } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

const MovieCard: React.FC<MovieProps> = ({ id, title, posterImage, releaseYear }) => {
  return (
    <Link
      href={`/movies/${id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      {/* Poster container — fully inline styles, no Tailwind */}
      <div style={{
        position: "relative",
        width: "100%",
        height: 430,
        overflow: "hidden",
        borderRadius: 6,
        background: "linear-gradient(160deg, #1a1d24 0%, #0d0f13 100%)",
      }}>
        {posterImage ? (
          <Image
            src={posterImage}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
            alt={title}
            style={{ objectFit: "cover", pointerEvents: "none" }}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 12,
          }}>
            <span style={{ fontSize: 40, opacity: 0.2 }}>🎬</span>
            <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.15)", fontFamily: "sans-serif", textTransform: "uppercase" }}>
              No Image
            </p>
          </div>
        )}

        {/* Hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.3s ease",
          pointerEvents: "none",
        }}
          className="movie-card-overlay"
        />
      </div>

      {/* Title + Year */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0" }}>
        <p style={{
          margin: 0, fontSize: 14, fontWeight: 700,
          color: "#fff", fontFamily: "sans-serif",
          overflow: "hidden", textOverflow: "ellipsis",
          whiteSpace: "nowrap", paddingRight: 8,
          transition: "color 0.2s",
        }}>
          {title}
        </p>
        <p style={{ margin: 0, fontSize: 14, color: "#E2D609", fontFamily: "sans-serif", flexShrink: 0 }}>
          {releaseYear}
        </p>
      </div>

      <style>{`
        a:hover .movie-card-overlay { background: rgba(0,0,0,0.45) !important; }
      `}</style>
    </Link>
  );
};

export default MovieCard;