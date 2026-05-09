import { useEffect } from "react";

export default function TrailerModal({
  trailerKey,
  onClose,
}: {
  trailerKey: string;
  onClose: () => void;
}) {
  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.97)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>

      {/* Close bar — full width, sits above video */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          flexShrink: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span style={{
          fontFamily: "sans-serif", fontSize: 11,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
        }}>
          Trailer
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.5)",
            padding: "6px 16px", borderRadius: 2,
            fontFamily: "sans-serif", fontSize: 11,
            letterSpacing: "0.15em", textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          ✕ Close
        </button>
      </div>

      {/* Video container — full width on mobile, capped on desktop */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "min(960px, 100vw)",
          padding: "0 0 16px",
          flexShrink: 0,
        }}
      >
        {/* 16:9 ratio wrapper */}
        <div style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%",
          background: "#000",
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&playsinline=1`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}