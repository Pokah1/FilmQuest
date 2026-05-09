import type { CastMember } from "@/interfaces/movie";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/";

function CastCard({ member }: { member: CastMember }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Photo */}
      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1/1",
        borderRadius: 8,
        overflow: "hidden",
        background: "#1a1d24",
        marginBottom: 8,
      }}>
        {member.profile_path ? (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img
            src={`${TMDB_IMAGE_BASE}w185${member.profile_path}`}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "top",
              display: "block",
              transition: "transform 0.4s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        ) : (
          <div style={{
            width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(160deg, #1e2128, #12141a)",
          }}>
            <span style={{ fontSize: 22, opacity: 0.2 }}>👤</span>
          </div>
        )}
        {/* Subtle bottom gradient */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 32,
          background: "linear-gradient(to top, rgba(8,10,13,0.7), transparent)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Name + character */}
      <p style={{
        margin: "0 0 2px",
        fontSize: 12, fontWeight: 600,
        fontFamily: "sans-serif",
        color: "rgba(255,255,255,0.88)",
        lineHeight: 1.3,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>
        {member.name}
      </p>
      <p style={{
        margin: 0, fontSize: 11,
        fontFamily: "sans-serif",
        color: "rgba(255,255,255,0.35)",
        fontStyle: "italic",
        lineHeight: 1.3,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>
        {member.character}
      </p>
    </div>
  );
}

export default function CastList({ cast }: { cast: CastMember[] }) {
  if (!cast.length) return null;

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{ width: 32, height: 1, background: "#E2D609" }} />
        <h2 style={{
          margin: 0,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
          fontWeight: 400, letterSpacing: "0.1em", color: "#fff",
        }}>
          Cast
        </h2>
        <div style={{
          flex: 1, height: 1,
          background: "linear-gradient(to right, rgba(226,214,9,0.2), transparent)",
        }} />
      </div>

      {/* Responsive grid — tight columns like Netflix/TMDB */}
      <div style={{
        display: "grid",
        gap: "16px 12px",
        gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
      }}>
        <style>{`
          @media (min-width: 640px) {
            .cast-grid-inner { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)) !important; }
          }
          @media (min-width: 1024px) {
            .cast-grid-inner { grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)) !important; }
          }
        `}</style>
        {cast.slice(0, 12).map((member) => (
          <CastCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}