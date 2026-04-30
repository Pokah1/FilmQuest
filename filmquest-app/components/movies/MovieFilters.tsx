import Button from "@/components/commons/Button";
import { GENRE_OPTIONS, YEAR_OPTIONS } from "@/constants/navigation";

interface Props {
  year: number | null;
  genre: string;
  onYearChange: (year: number | null) => void;
  onGenreChange: (genre: string) => void;
}

const MovieFilters: React.FC<Props> = ({ year, genre, onYearChange, onGenreChange }) => (
  <div style={{ paddingTop: 56, paddingBottom: 48 }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');
      .filter-input::placeholder { color: rgba(255,255,255,0.25); }
      .filter-input:focus { border-color: #E2D609 !important; outline: none; }
      .filter-select option { background: #110F17; color: white; }
    `}</style>

    {/* Page heading */}
    <div style={{ marginBottom: 48 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
        <div style={{ width: 36, height: 1, background: "#E2D609" }} />
        <span style={{
          fontFamily: "sans-serif", fontSize: 10,
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "#E2D609",
        }}>
          Online Streaming
        </span>
      </div>
      <h1 style={{
        margin: 0,
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(3.5rem, 8vw, 7rem)",
        fontWeight: 400, lineHeight: 0.9,
        letterSpacing: "0.02em", color: "#fff",
      }}>
        {genre !== "All" ? genre : "All"}{" "}
        <span style={{ color: "#E2D609" }}>Movies</span>
        {year && (
          <span style={{
            display: "block",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(1.2rem, 3vw, 2.2rem)",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.05em", marginTop: 8,
          }}>
            {year} Collection
          </span>
        )}
      </h1>
    </div>

    {/* Divider */}
    <div style={{ height: 1, background: "linear-gradient(to right, #E2D60944, transparent)", marginBottom: 36 }} />

    {/* Controls row */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>

      {/* Search + Year */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute", left: 16, top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(255,255,255,0.25)", fontSize: 14,
          }}>⌕</span>
          <input
            type="text"
            placeholder="Search titles..."
            className="filter-input"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 3, padding: "10px 16px 10px 38px",
              color: "#fff", fontFamily: "sans-serif",
              fontSize: 13, width: 220,
              transition: "border-color 0.2s",
            }}
          />
        </div>

        <select
          value={year ?? ""}
          onChange={(e) => onYearChange(e.target.value ? Number(e.target.value) : null)}
          className="filter-select"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 3, padding: "10px 20px",
            color: year ? "#fff" : "rgba(255,255,255,0.3)",
            fontFamily: "sans-serif", fontSize: 13,
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
        >
          <option value="">All Years</option>
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Genre buttons — using your Button component */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {GENRE_OPTIONS.map((g) => (
          <Button
            key={g}
            title={g}
            action={() => onGenreChange(g)}
          />
        ))}
      </div>
    </div>
  </div>
);

export default MovieFilters;