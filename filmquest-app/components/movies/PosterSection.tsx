import RatingDial from "@/components/commons/RatingDial";

interface Props {
  posterUrl: string | null;
  title: string;
  rating: number;
  votes: number;
}

export default function PosterSection({ posterUrl, rating, votes }: Props) {
  return (
    <div style={{
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      animation: "slideLeft 0.8s 0.1s ease both",
    }}>
      {/* Poster frame with corner accents */}
      <div style={{ position: "relative" }}>
        {/* Corner accents */}
        {[
          { top: -8, left: -8, borderTop: "2px solid #E2D609", borderLeft: "2px solid #E2D609" },
          { top: -8, right: -8, borderTop: "2px solid #E2D609", borderRight: "2px solid #E2D609" },
          { bottom: -8, left: -8, borderBottom: "2px solid #E2D609", borderLeft: "2px solid #E2D609" },
          { bottom: -8, right: -8, borderBottom: "2px solid #E2D609", borderRight: "2px solid #E2D609" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 20, height: 20, zIndex: 2, ...s }} />
        ))}

        {/* Poster — smaller on mobile, full size on desktop */}
        <div style={{
          width: "min(260px, 80vw)",
          aspectRatio: "2/3",
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
          background: "#1a1d24",
        }}>
          {posterUrl ? (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img
              src={posterUrl}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 48, opacity: 0.15 }}>🎬</span>
            </div>
          )}
        </div>
      </div>

      {/* Rating dial below poster */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, marginTop: 24 }}>
        <RatingDial value={rating} />
        <p style={{
          margin: 0, fontSize: 10, fontFamily: "sans-serif",
          color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}>
          {votes.toLocaleString()} votes
        </p>
      </div>
    </div>
  );
}