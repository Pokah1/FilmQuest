import Button from "@/components/commons/Button";

const CORNER_POSITIONS = [
  { top: 20, left: 20 },
  { top: 20, right: 20 },
  { bottom: 20, left: 20 },
  { bottom: 20, right: 20 },
] as const;

const JoinCTA: React.FC = () => (
  <section
    style={{
      margin: "0 40px 80px",
      borderRadius: 20,
      padding: "80px 60px",
      background: "linear-gradient(135deg, #111318 0%, #1a1d24 50%, #111318 100%)",
      border: "1px solid rgba(226,214,9,0.15)",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}
  >
    {/* Decorative corner accents */}
    {CORNER_POSITIONS.map((pos, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          ...pos,
          width: 30,
          height: 30,
          borderTop: i < 2 ? "1px solid #E2D60955" : undefined,
          borderBottom: i >= 2 ? "1px solid #E2D60955" : undefined,
          borderLeft: i % 2 === 0 ? "1px solid #E2D60955" : undefined,
          borderRight: i % 2 === 1 ? "1px solid #E2D60955" : undefined,
        }}
      />
    ))}

    <div style={{ position: "relative", zIndex: 1 }}>
      <p
        style={{
          margin: "0 0 16px",
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "#E2D609",
          textTransform: "uppercase",
          fontFamily: "sans-serif",
        }}
      >
        Your Cinema Companion
      </p>

      <h2
        style={{
          margin: "0 0 20px",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 800,
          lineHeight: 1.1,
        }}
      >
        Join FilmQuest Now!
      </h2>

      <p
        style={{
          margin: "0 auto 40px",
          maxWidth: 520,
          fontSize: "1.1rem",
          lineHeight: 1.7,
          color: "rgba(255,255,255,0.6)",
          fontFamily: "sans-serif",
          fontWeight: 300,
        }}
      >
        Sign up today to access the latest movies, exclusive content,
        and personalized recommendations crafted just for you.
      </p>

      <div className="cta-btn" style={{ display: "inline-block" }}>
        <Button title="Get Started" />
      </div>
    </div>
  </section>
);

export default JoinCTA;