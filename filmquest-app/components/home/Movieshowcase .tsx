import { MOVIES } from "@/mock_data/movies";
import PosterCard from "./PosterCard";

type Props = {
  onViewAll: () => void;
};

const MovieShowcase: React.FC<Props> = ({ onViewAll }) => (
  <section style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
    {/* Section header */}
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 48,
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            fontSize: 11,
            letterSpacing: "0.2em",
            color: "#E2D609",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            marginBottom: 12,
          }}
        >
          Now Trending
        </p>
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          Must-Watch Films
        </h2>
      </div>

      <span
        onClick={onViewAll}
        style={{
          fontSize: 13,
          color: "rgba(255,255,255,0.45)",
          fontFamily: "sans-serif",
          cursor: "pointer",
          letterSpacing: "0.05em",
        }}
      >
        View all →
      </span>
    </div>

    {/* Cards grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 24,
      }}
    >
      {MOVIES.map((m, i) => (
        <PosterCard key={m.title} movie={m} index={i} />
      ))}
    </div>
  </section>
);

export default MovieShowcase;