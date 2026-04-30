import { fetchMovieDetail } from "@/lib/movieDetailCache";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/";

interface Genre { id: number; name: string; }
interface CastMember { id: number; name: string; character: string; profile_path: string | null; }

interface MovieDetail {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  cast: CastMember[];
  trailerKey: string | null;
  status: string;
  budget: number;
  revenue: number;
}

const RatingDial: React.FC<{ value: number }> = ({ value }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const pct = (value / 10) * circumference;
  const color = value >= 7 ? "#E2D609" : value >= 5 ? "#FF8C42" : "#E05C00";
  return (
    <div style={{ position: "relative", width: 80, height: 80 }}>
      <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
        <circle
          cx="40" cy="40" r={radius} fill="none"
          stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - pct}
          style={{ transition: "stroke-dashoffset 1.5s ease 0.8s" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 20, fontWeight: 900, color, fontFamily: "sans-serif", lineHeight: 1 }}>
          {value.toFixed(1)}
        </span>
        <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontFamily: "sans-serif", letterSpacing: "0.1em" }}>/ 10</span>
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div style={{
    padding: "12px 20px",
    border: "1px solid rgba(226,214,9,0.15)",
    borderRadius: 4,
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(8px)",
    minWidth: 100,
  }}>
    <p style={{ margin: "0 0 4px", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif" }}>{label}</p>
    <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "sans-serif" }}>{value}</p>
  </div>
);

export default function MovieDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [backdropReady, setBackdropReady] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setBackdropReady(false);
    fetchMovieDetail(id as string)
      .then((data) => { setMovie(data as MovieDetail); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#080A0D", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid rgba(226,214,9,0.15)", borderTop: "2px solid #E2D609", animation: "spin 0.9s linear infinite" }} />
      <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", margin: 0 }}>Fetching</p>
    </div>
  );

  if (!movie) return (
    <div style={{ minHeight: "100vh", background: "#080A0D", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif" }}>Movie not found.</p>
    </div>
  );

  // ← w1280 instead of original — much faster, no timeout
  const backdropUrl = movie.backdrop_path ? `${TMDB_IMAGE_BASE}w1280${movie.backdrop_path}` : null;
  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE}w500${movie.poster_path}` : null;
  const year = movie.release_date?.slice(0, 4) ?? "N/A";
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A";
  const budget = movie.budget ? `$${(movie.budget / 1_000_000).toFixed(0)}M` : "N/A";
  const revenue = movie.revenue ? `$${(movie.revenue / 1_000_000).toFixed(0)}M` : "N/A";

  return (
    <div style={{ background: "#080A0D", color: "#fff", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&display=swap');
        @keyframes fadeIn   { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp  { from { opacity: 0; transform: translateY(50px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes slideLeft{ from { opacity: 0; transform: translateX(-50px) } to { opacity: 1; transform: translateX(0) } }
        @keyframes spin     { to { transform: rotate(360deg) } }
        .cast-card:hover img { transform: scale(1.08); }
        .cast-card:hover .cast-name { color: #E2D609 !important; }
        .back-link:hover { color: #E2D609 !important; }
        .trailer-btn:hover { background: #E2D609 !important; color: #000 !important; }
        .genre-pill:hover { background: rgba(226,214,9,0.2) !important; border-color: rgba(226,214,9,0.6) !important; }
      `}</style>

      {/* ── BACKDROP — z-index: 0 so it never covers Header/Footer ── */}
      <div style={{
        position: "absolute",  // ← absolute not fixed, stays inside the page flow
        top: 0, left: 0, right: 0,
        height: "75vh",        // ← only covers top portion, not full page
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}>
        {backdropUrl && (
          <Image
            src={backdropUrl} alt="" fill priority
            style={{ objectFit: "cover", objectPosition: "top", opacity: backdropReady ? 0.2 : 0, transition: "opacity 2s ease" }}
            onLoad={() => setBackdropReady(true)}
          />
        )}
        {/* Gradients to blend into page background */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, #080A0D 35%, rgba(8,10,13,0.5) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, #080A0D 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 80% 0%, rgba(226,214,9,0.06) 0%, transparent 60%)" }} />
      </div>

      {/* ── PAGE CONTENT — z-index: 1 sits above backdrop ── */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 32px 80px" }}>

        {/* Back */}
        <div style={{ paddingTop: 36, paddingBottom: 48, animation: "fadeIn 0.5s ease both" }}>
          <Link href="/movies" style={{ textDecoration: "none" }}>
            <span className="back-link" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              color: "rgba(255,255,255,0.4)", fontFamily: "sans-serif",
              fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
              transition: "color 0.3s ease", cursor: "pointer",
            }}>
              ← Back to Movies
            </span>
          </Link>
        </div>

        {/* ── MAIN GRID ── */}
        <div style={{ display: "flex", gap: 64, alignItems: "flex-start", flexWrap: "wrap" }}>

          {/* Poster */}
          <div style={{ flexShrink: 0, animation: "slideLeft 0.9s 0.1s ease both" }}>
            <div style={{ position: "relative" }}>
              {[
                { top: -10, left: -10, borderTop: "2px solid #E2D609", borderLeft: "2px solid #E2D609" },
                { top: -10, right: -10, borderTop: "2px solid #E2D609", borderRight: "2px solid #E2D609" },
                { bottom: -10, left: -10, borderBottom: "2px solid #E2D609", borderLeft: "2px solid #E2D609" },
                { bottom: -10, right: -10, borderBottom: "2px solid #E2D609", borderRight: "2px solid #E2D609" },
              ].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: 24, height: 24, ...s, zIndex: 2 }} />
              ))}
              <div style={{ position: "relative", width: 300, height: 450, borderRadius: 6, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.8)" }}>
                {posterUrl ? (
                  <Image src={posterUrl} alt={movie.title} fill style={{ objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "#1a1d24", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 48, opacity: 0.15 }}>🎬</span>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <RatingDial value={movie.vote_average} />
                  <p style={{ margin: 0, fontSize: 10, fontFamily: "sans-serif", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    {movie.vote_count.toLocaleString()} votes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18, animation: "slideUp 0.7s 0.2s ease both" }}>
              {movie.genres.map((g) => (
                <span key={g.id} className="genre-pill" style={{
                  padding: "4px 14px", borderRadius: 2,
                  border: "1px solid rgba(226,214,9,0.25)",
                  background: "rgba(226,214,9,0.07)",
                  fontSize: 10, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "#E2D609",
                  fontFamily: "sans-serif", transition: "all 0.2s",
                }}>
                  {g.name}
                </span>
              ))}
            </div>

            <h1 style={{
              margin: "0 0 6px",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 6vw, 6rem)",
              fontWeight: 400, lineHeight: 0.9,
              letterSpacing: "0.02em",
              animation: "slideUp 0.8s 0.25s ease both",
            }}>
              {movie.title}
            </h1>

            {movie.tagline && (
              <p style={{
                margin: "0 0 28px",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic", fontWeight: 300,
                fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
                color: "rgba(255,255,255,0.45)",
                animation: "slideUp 0.8s 0.3s ease both",
              }}>
                &quot;{movie.tagline}&quot;
              </p>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 28, animation: "slideUp 0.8s 0.35s ease both" }}>
              <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{year}</span>
              <span style={{ opacity: 0.3 }}>·</span>
              <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{runtime}</span>
              <span style={{ opacity: 0.3 }}>·</span>
              <span style={{ padding: "3px 12px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 2, fontSize: 11, fontFamily: "sans-serif", color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em" }}>
                {movie.status}
              </span>
              <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                {movie.vote_count.toLocaleString()} votes
              </span>
            </div>

            <p style={{
              margin: "0 0 32px", maxWidth: 600,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              fontWeight: 300, lineHeight: 1.9,
              color: "rgba(255,255,255,0.65)",
              animation: "slideUp 0.8s 0.4s ease both",
            }}>
              {movie.overview}
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36, animation: "slideUp 0.8s 0.45s ease both" }}>
              <Stat label="Budget" value={budget} />
              <Stat label="Box Office" value={revenue} />
              <Stat label="Runtime" value={runtime} />
              <Stat label="Year" value={year} />
            </div>

            {movie.trailerKey && (
              <div style={{ animation: "slideUp 0.8s 0.5s ease both" }}>
                <button
                  className="trailer-btn"
                  onClick={() => setShowTrailer(true)}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 12,
                    padding: "13px 30px",
                    border: "1px solid #E2D609",
                    borderRadius: 3, background: "transparent",
                    color: "#E2D609", fontSize: 12,
                    fontFamily: "sans-serif",
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    cursor: "pointer", transition: "all 0.3s ease",
                  }}
                >
                  <span>▶</span> Watch Trailer
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── CAST ── */}
        {movie.cast.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <div style={{ width: 36, height: 1, background: "#E2D609" }} />
              <h2 style={{ margin: 0, fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 400, letterSpacing: "0.1em" }}>Cast</h2>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(226,214,9,0.3), transparent)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 16 }}>
              {movie.cast.slice(0, 12).map((member) => (
                <div key={member.id} className="cast-card" style={{ cursor: "default" }}>
                  <div style={{ position: "relative", height: 160, borderRadius: 4, overflow: "hidden", background: "#1a1d24", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 10 }}>
                    {member.profile_path ? (
                      <Image src={`${TMDB_IMAGE_BASE}w185${member.profile_path}`} alt={member.name} fill style={{ objectFit: "cover", transition: "transform 0.4s ease" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 32, opacity: 0.15 }}>👤</span>
                      </div>
                    )}
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 50, background: "linear-gradient(to top, rgba(8,10,13,0.9), transparent)" }} />
                  </div>
                  <p className="cast-name" style={{ margin: "0 0 3px", fontSize: 12, fontWeight: 700, fontFamily: "sans-serif", color: "rgba(255,255,255,0.85)", lineHeight: 1.3, transition: "color 0.2s" }}>{member.name}</p>
                  <p style={{ margin: 0, fontSize: 11, fontFamily: "sans-serif", color: "rgba(255,255,255,0.3)", lineHeight: 1.3, fontStyle: "italic" }}>{member.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── TRAILER MODAL ── */}
      {showTrailer && movie.trailerKey && (
        <div
          onClick={() => setShowTrailer(false)}
          style={{
            position: "fixed", inset: 0,
            zIndex: 9999,  // ← above everything including header
            background: "rgba(0,0,0,0.95)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fadeIn 0.25s ease", cursor: "pointer",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(920px, 92vw)", cursor: "default" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
              <button
                onClick={() => setShowTrailer(false)}
                style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", padding: "6px 16px", borderRadius: 2, fontFamily: "sans-serif", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
              >
                ✕ Close
              </button>
            </div>
            <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 6, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.9)" }}>
              <iframe
                src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1&rel=0`}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 700px) {
          div[style*="display: flex; gap: 64px"] { flex-direction: column !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}