import CastCard from "./CastCard";
import type { CastMember } from "@/interfaces/movie";

export default function CastList({ cast }: { cast: CastMember[] }) {
  if (!cast.length) return null;

  return (
    <div style={{ marginTop: 80 }}>
      <h2>Cast</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 16
      }}>
        {cast.slice(0, 12).map(member => (
          <CastCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}