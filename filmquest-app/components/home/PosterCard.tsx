import type { Movie } from "@/mock_data/movies";

type Props = {
  movie: Movie;
  index: number;
};

const PosterCard = ({ movie, index }: Props) => {
  return (
    <div
      className="movie-card"
      style={{
        minWidth: 180,
        height: 270,
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        flexShrink: 0,
        animation: `cardFloat ${2.5 + index * 0.3}s ease-in-out infinite alternate`,
        animationDelay: `${index * 0.15}s`,
        boxShadow: `0 8px 32px ${movie.color}44`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div
        style={{
          background: movie.bg,
          width: "100%",
          height: "100%",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Dots */}
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            gap: 4,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <span
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: movie.accent,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Circle */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: `2px solid ${movie.accent}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: `${movie.accent}33`,
              border: `1px solid ${movie.accent}99`,
            }}
          />
        </div>

        {/* Rating */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            background: "#F5C51888",
            backdropFilter: "blur(4px)",
            borderRadius: 6,
            padding: "3px 8px",
            fontSize: 11,
            fontWeight: 700,
            color: "#F5C518",
            letterSpacing: "0.05em",
          }}
        >
          ★ {movie.rating}
        </div>

        {/* Info */}
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 10,
              color: movie.accent,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            {movie.genre}
          </p>

          <h3
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.3,
              marginBottom: 4,
            }}
          >
            {movie.title}
          </h3>

          <p
            style={{
              margin: 0,
              fontSize: 11,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {movie.year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PosterCard;