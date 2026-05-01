import Image from "next/image";
import type { CastMember } from "@/interfaces/movie";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/";

export default function CastCard({ member }: { member: CastMember }) {
  return (
    <div className="cast-card" style={{ cursor: "default" }}>
      <div style={{
        position: "relative",
        height: 160,
        borderRadius: 4,
        overflow: "hidden",
        background: "#1a1d24",
        border: "1px solid rgba(255,255,255,0.05)",
        marginBottom: 10
      }}>
        {member.profile_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE}w185${member.profile_path}`}
            alt={member.name}
            fill
            style={{
              objectFit: "cover",
              transition: "transform 0.4s ease"
            }}
          />
        ) : (
          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <span style={{ fontSize: 32, opacity: 0.15 }}>👤</span>
          </div>
        )}

        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 50,
          background: "linear-gradient(to top, rgba(8,10,13,0.9), transparent)"
        }} />
      </div>

      <p className="cast-name" style={{
        margin: "0 0 3px",
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "sans-serif",
        color: "rgba(255,255,255,0.85)"
      }}>
        {member.name}
      </p>

      <p style={{
        margin: 0,
        fontSize: 11,
        fontFamily: "sans-serif",
        color: "rgba(255,255,255,0.3)",
        fontStyle: "italic"
      }}>
        {member.character}
      </p>
    </div>
  );
}