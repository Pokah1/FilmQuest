import Button from "@/components/commons/Button";
import { MOVIES } from "@/mock_data/movies";
import PosterCard from "./PosterCard";

const STARS = Array.from({ length: 60 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 3,
}));

const GENRES = ["Action", "Drama", "Sci-Fi", "Thriller", "Comedy", "Horror"];

type Props = {
  onBrowse: () => void;
};


const HeroSection: React.FC<Props> = ({ onBrowse }) => (
  <section
    style={{
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
    }}
  >
    {/* Star field */}
    <div style={{ position: "absolute", inset: 0 }}>
      {STARS.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "white",
            opacity: 0,
            animation: `twinkle 3s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>

    {/* Cinematic light beam */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 2,
        height: "60%",
        background: "linear-gradient(to bottom, #E2D60955, transparent)",
        filter: "blur(1px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: 300,
        height: "40%",
        background: "radial-gradient(ellipse at top, #E2D60911 0%, transparent 70%)",
      }}
    />

    {/* Vignette */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, transparent 30%, #0A0C10 100%)",
        pointerEvents: "none",
      }}
    />

    {/* Scanlines */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: 0.03,
      }}
    >
      {[...Array(80)].map((_, i) => (
        <div key={i} style={{ height: 1, background: "white", marginBottom: 5 }} />
      ))}
    </div>

    {/* Hero text content */}
    <div
      style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 40px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 24 }}>

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, animation: "slideInLeft 0.7s ease both" }}>
          <div style={{ width: 40, height: 1, background: "#E2D609" }} />
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#E2D609",
              fontFamily: "sans-serif",
            }}
          >
            FilmQuest
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            animation: "fadeUp 0.8s 0.2s ease both",
            maxWidth: 700,
          }}
        >
          Cinema&apos;s{" "}
          <span
            style={{
              color: "#E2D609",
              display: "inline-block",
              animation: "pulseGlow 3s ease-in-out infinite",
              borderRadius: 4,
              padding: "0 4px",
            }}
          >
            Greatest 
          </span>
          <br />
          Stories
        </h1>

        {/* Subtitle */}
        <p
          style={{
            margin: 0,
            maxWidth: 520,
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.65)",
            fontFamily: "sans-serif",
            fontWeight: 300,
            animation: "fadeUp 0.8s 0.4s ease both",
          }}
        >
          From golden-age classics to this season&apos;s blockbusters — discover, track,
          and fall in love with the films that define cinema.
        </p>

        {/* Genre pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, animation: "fadeUp 0.8s 0.5s ease both" }}>
          {GENRES.map((g) => (
            <span
              key={g}
              className="genre-pill"
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                border: "1px solid rgba(226,214,9,0.35)",
                fontSize: 12,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "sans-serif",
                transition: "all 0.2s",
              }}
            >
              {g}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            animation: "fadeUp 0.8s 0.6s ease both",
            marginTop: 8,
          }}
        >
          <div className="cta-btn">
            <Button title="Browse Movies" action={onBrowse} />
          </div>
          <button
            style={{
              padding: "12px 28px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "rgba(255,255,255,0.8)",
              fontSize: 15,
              fontFamily: "sans-serif",
              cursor: "pointer",
              letterSpacing: "0.04em",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = "transparent";
            }}
          >
            ▶ Watch Trailer
          </button>
        </div>

      </div>
    </div>

    {/* Floating cards (desktop only) */}
    <div
      className="hero-cards"
      style={{
        position: "absolute",
        right: "-20px",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        opacity: 0.85,
        animation: "slideInRight 1s 0.3s ease both",
      }}
    >
      {MOVIES.slice(0, 3).map((m, i) => (
        <PosterCard key={m.title} movie={m} index={i} />
      ))}
    </div>

    {/* Bottom fade */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        background: "linear-gradient(to bottom, transparent, #0A0C10)",
        pointerEvents: "none",
      }}
    />
  </section>
);

export default HeroSection;