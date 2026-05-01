import { GENRE_OPTIONS, YEAR_OPTIONS } from "@/constants/navigation";
import { useEffect, useRef, useState } from "react";

interface Props {
  year: number | null;
  genre: string;
  search: string;
  onYearChange: (year: number | null) => void;
  onGenreChange: (genreId: string) => void;
  onSearchChange: (query: string) => void;
}

const MovieFilters: React.FC<Props> = ({
  year, genre, search,
  onYearChange, onGenreChange, onSearchChange,
}) => {
  const [inputValue, setInputValue] = useState(search);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeGenreLabel = GENRE_OPTIONS.find((g) => g.id === genre)?.label ?? "All";

  // Debounce: wait 1000ms after user stops typing before firing search
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearchChange(val);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <div style={{ paddingTop: 56, paddingBottom: 48 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');
        .filter-input::placeholder { color: rgba(255,255,255,0.25); }
        .filter-input:focus { border-color: rgba(226,214,9,0.6) !important; outline: none; }
        .filter-select option { background: #110F17; color: white; }
        .genre-btn { transition: all 0.2s ease; }
        .genre-btn:hover { border-color: rgba(226,214,9,0.5) !important; color: rgba(226,214,9,0.8) !important; }
      `}</style>

      {/* Heading */}
      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
          <div style={{ width: 36, height: 1, background: "#E2D609" }} />
          <span style={{ fontFamily: "sans-serif", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "#E2D609" }}>
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
          {inputValue.trim()
            ? <><span style={{ color: "#E2D609" }}>Results for </span>&quot;{inputValue}&quot;</>
            : <>{activeGenreLabel} <span style={{ color: "#E2D609" }}>Movies</span></>
          }
          {year && !inputValue.trim() && (
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

      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>

        {/* Search + Year */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.25)", fontSize: 14 }}>⌕</span>
            <input
              type="text"
              value={inputValue}
              onChange={handleSearchInput}
              placeholder="Search titles..."
              className="filter-input"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${inputValue ? "rgba(226,214,9,0.4)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: 3, padding: "10px 16px 10px 38px",
                color: "#fff", fontFamily: "sans-serif",
                fontSize: 13, width: 220,
                transition: "border-color 0.2s",
              }}
            />
            {/* Clear button */}
            {inputValue && (
              <button
                onClick={() => { setInputValue(""); onSearchChange(""); }}
                style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  color: "rgba(255,255,255,0.3)", cursor: "pointer",
                  fontSize: 14, padding: 0, lineHeight: 1,
                }}
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={year ?? ""}
            onChange={(e) => onYearChange(e.target.value ? Number(e.target.value) : null)}
            className="filter-select"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${year ? "rgba(226,214,9,0.4)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 3, padding: "10px 20px",
              color: year ? "#fff" : "rgba(255,255,255,0.3)",
              fontFamily: "sans-serif", fontSize: 13,
              cursor: "pointer", transition: "border-color 0.2s",
            }}
          >
            <option value="">All Years</option>
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Genre buttons — active one highlighted gold */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {GENRE_OPTIONS.map((g) => {
            const isActive = g.id === genre;
            return (
              <button
                key={g.id}
                className="genre-btn"
                onClick={() => onGenreChange(g.id)}
                style={{
                  padding: "8px 20px",
                  border: `1px solid ${isActive ? "#E2D609" : "rgba(255,255,255,0.12)"}`,
                  borderRadius: 999,
                  background: isActive ? "#E2D609" : "transparent",
                  color: isActive ? "#000" : "rgba(255,255,255,0.55)",
                  fontFamily: "sans-serif",
                  fontSize: 12, letterSpacing: "0.08em",
                  fontWeight: isActive ? 700 : 400,
                  cursor: "pointer",
                }}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieFilters;