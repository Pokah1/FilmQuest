import type { WatchProviders } from "@/interfaces/movie";

const TMDB_LOGO_BASE = "https://image.tmdb.org/t/p/original";

interface Props {
  imdbId: string | null;
  tmdbWatchUrl: string;
  watchProviders: WatchProviders | null;
  movieId: number;
}

export default function WatchLinks({ imdbId, tmdbWatchUrl, watchProviders }: Props) {
  // Merge all providers, deduplicate by provider_id
  const allProviders = [
    ...(watchProviders?.flatrate ?? []),
    ...(watchProviders?.rent ?? []),
    ...(watchProviders?.buy ?? []),
  ].filter(
    (p, i, arr) => arr.findIndex((x) => x.provider_id === p.provider_id) === i
  ).slice(0, 6);

  return (
    <div style={{ marginTop: 28 }}>
      {/* Section label */}
      <p style={{
        margin: "0 0 14px",
        fontFamily: "sans-serif",
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
      }}>
        Where to Watch
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>

        {/* Streaming provider logos */}
        {allProviders.length > 0 && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {allProviders.map((p) => (
              <a
                key={p.provider_id}
                href={watchProviders?.link ?? tmdbWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={p.provider_name}
                style={{ display: "block", flexShrink: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${TMDB_LOGO_BASE}${p.logo_path}`}
                  alt={p.provider_name}
                  style={{
                    width: 40, height: 40,
                    borderRadius: 8,
                    objectFit: "cover",
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.1)";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(226,214,9,0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </a>
            ))}
          </div>
        )}

        {/* Divider if we have both providers and links */}
        {allProviders.length > 0 && (
          <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} />
        )}

        {/* IMDb button */}
        {imdbId && (
          <a
            href={`https://www.imdb.com/title/${imdbId}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "8px 14px",
              background: "#F5C518",
              borderRadius: 4,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <span style={{
              fontFamily: "sans-serif", fontWeight: 900,
              fontSize: 13, color: "#000", letterSpacing: "0.02em",
            }}>
              IMDb
            </span>
          </a>
        )}

        {/* TMDB Watch page — always available as fallback */}
        <a
          href={tmdbWatchUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 14px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 4,
            textDecoration: "none",
            transition: "all 0.2s",
            background: "transparent",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.borderColor = "rgba(226,214,9,0.4)";
            e.currentTarget.style.background = "rgba(226,214,9,0.06)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <span style={{
            fontFamily: "sans-serif", fontSize: 11,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            Streaming Info
          </span>
        </a>
      </div>

      {/* No providers message */}
      {allProviders.length === 0 && !imdbId && (
        <p style={{
          margin: 0, fontFamily: "sans-serif",
          fontSize: 11, color: "rgba(255,255,255,0.25)",
          fontStyle: "italic",
        }}>
          No streaming info available for your region
        </p>
      )}
    </div>
  );
}