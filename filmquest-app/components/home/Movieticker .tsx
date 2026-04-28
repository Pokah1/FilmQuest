import { MOVIES } from "@/mock_data/movies";

const MovieTicker: React.FC = () => (
  <div
    style={{
      borderTop: "1px solid rgba(226,214,9,0.2)",
      borderBottom: "1px solid rgba(226,214,9,0.2)",
      overflow: "hidden",
      padding: "14px 0",
      background: "#0D0F13",
    }}
  >
    {/* Duplicate the list so the scroll loops seamlessly */}
    <div
      style={{
        display: "flex",
        animation: "ticker 25s linear infinite",
        width: "max-content",
      }}
    >
      {[...MOVIES, ...MOVIES].map((m, i) => (
        <span
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "0 40px",
            fontSize: 13,
            fontFamily: "sans-serif",
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#E2D609" }}>★ {m.rating}</span>
          {m.title}
        </span>
      ))}
    </div>
  </div>
);

export default MovieTicker;