import { useRouter } from "next/router";

export const EmptyState = () => {
  const router = useRouter();

  return (
    <div style={{
      minHeight: "100vh", background: "#080A0D",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 20, padding: "0 24px", textAlign: "center",
    }}>
      <span style={{ fontSize: 56, opacity: 0.2 }}>🎬</span>
      <h2 style={{
        margin: 0,
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(2rem, 6vw, 3.5rem)",
        color: "rgba(255,255,255,0.2)",
        letterSpacing: "0.1em", fontWeight: 400,
      }}>
        Movie Not Found
      </h2>
      <p style={{
        margin: 0, fontFamily: "sans-serif",
        fontSize: 12, letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.2)",
        textTransform: "uppercase",
      }}>
        This title may have been removed or doesn&apos;t exist
      </p>
      <button
        onClick={() => router.push("/movies")}
        style={{
          marginTop: 8,
          padding: "12px 28px",
          border: "1px solid rgba(226,214,9,0.3)",
          background: "transparent", color: "#E2D609",
          fontFamily: "sans-serif", fontSize: 11,
          letterSpacing: "0.2em", textTransform: "uppercase",
          cursor: "pointer", borderRadius: 2,
          transition: "all 0.2s",
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = "#E2D609"; e.currentTarget.style.color = "#000"; }}
        onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#E2D609"; }}
      >
        ← Back to Movies
      </button>
    </div>
  );
};