const Loading: React.FC = () => {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "rgba(5,6,8,0.92)",
      backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        @keyframes projector {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.04); }
        }
        @keyframes filmStrip {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes reelSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes beamPulse {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.13; }
        }
        @keyframes countUp {
          0%   { content: "I"; }
          33%  { content: "II"; }
          66%  { content: "III"; }
          100% { content: "IV"; }
        }
        @keyframes scanline {
          0%   { top: -4px; }
          100% { top: 100%; }
        }
        @keyframes flickr {
          0%, 95%, 100% { opacity: 1; }
          96% { opacity: 0.4; }
          97% { opacity: 1; }
          98% { opacity: 0.6; }
        }
      `}</style>

      {/* Projector beam */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: "180px solid transparent",
        borderRight: "180px solid transparent",
        borderTop: "100vh solid rgba(226,214,9,0.04)",
        animation: "beamPulse 2s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Main card */}
      <div style={{
        position: "relative",
        width: 320,
        animation: "flickr 4s ease-in-out infinite",
      }}>
        {/* Film strip left */}
        <div style={{
          position: "absolute", left: -36, top: "50%",
          transform: "translateY(-50%)",
          width: 28, height: 200,
          overflow: "hidden",
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
        }}>
          <div style={{
            display: "flex", flexDirection: "column",
            animation: "filmStrip 1.2s linear infinite",
          }}>
            {[...Array(16)].map((_, i) => (
              <div key={i} style={{
                height: 24, borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 3px", flexShrink: 0,
              }}>
                <div style={{ width: 5, height: 14, borderRadius: 1, background: "rgba(255,255,255,0.12)" }} />
                <div style={{ width: 5, height: 14, borderRadius: 1, background: "rgba(255,255,255,0.12)" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Film strip right */}
        <div style={{
          position: "absolute", right: -36, top: "50%",
          transform: "translateY(-50%)",
          width: 28, height: 200,
          overflow: "hidden",
          background: "#0d0d0d",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 2,
        }}>
          <div style={{
            display: "flex", flexDirection: "column",
            animation: "filmStrip 1.2s linear infinite",
            animationDelay: "0.6s",
          }}>
            {[...Array(16)].map((_, i) => (
              <div key={i} style={{
                height: 24, borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 3px", flexShrink: 0,
              }}>
                <div style={{ width: 5, height: 14, borderRadius: 1, background: "rgba(255,255,255,0.12)" }} />
                <div style={{ width: 5, height: 14, borderRadius: 1, background: "rgba(255,255,255,0.12)" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Central screen */}
        <div style={{
          background: "#0a0b0d",
          border: "1px solid rgba(226,214,9,0.2)",
          borderRadius: 4,
          padding: "48px 36px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 0 60px rgba(226,214,9,0.06), inset 0 0 40px rgba(0,0,0,0.5)",
        }}>
          {/* Scanline */}
          <div style={{
            position: "absolute", left: 0, right: 0, height: 2,
            background: "linear-gradient(to right, transparent, rgba(226,214,9,0.3), transparent)",
            animation: "scanline 2s linear infinite",
            pointerEvents: "none",
          }} />

          {/* Reel icon */}
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            border: "2px solid rgba(226,214,9,0.3)",
            margin: "0 auto 24px",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "reelSpin 3s linear infinite",
            position: "relative",
          }}>
            {/* Spokes */}
            {[0, 60, 120].map((deg) => (
              <div key={deg} style={{
                position: "absolute",
                width: 2, height: "36%",
                background: "rgba(226,214,9,0.4)",
                borderRadius: 1,
                transformOrigin: "bottom center",
                transform: `rotate(${deg}deg) translateX(-50%)`,
                left: "50%", bottom: "50%",
              }} />
            ))}
            <div style={{
              width: 16, height: 16, borderRadius: "50%",
              background: "#E2D609",
              boxShadow: "0 0 12px #E2D609",
            }} />
          </div>

          {/* Title */}
          <h2 style={{
            margin: "0 0 6px",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 42, fontWeight: 400,
            letterSpacing: "0.12em",
            color: "#fff",
            animation: "projector 2s ease-in-out infinite",
          }}>
            Loading
          </h2>

          {/* Subtitle */}
          <p style={{
            margin: "0 0 28px",
            fontFamily: "sans-serif",
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}>
            Cueing your next feature
          </p>

          {/* Progress dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {[0, 0.3, 0.6].map((delay, i) => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#E2D609",
                animation: `projector 1.2s ${delay}s ease-in-out infinite`,
              }} />
            ))}
          </div>

          {/* Corner accents */}
          {[
            { top: 10, left: 10, borderTop: "1px solid #E2D60955", borderLeft: "1px solid #E2D60955" },
            { top: 10, right: 10, borderTop: "1px solid #E2D60955", borderRight: "1px solid #E2D60955" },
            { bottom: 10, left: 10, borderBottom: "1px solid #E2D60955", borderLeft: "1px solid #E2D60955" },
            { bottom: 10, right: 10, borderBottom: "1px solid #E2D60955", borderRight: "1px solid #E2D60955" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: 16, height: 16, ...s }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;