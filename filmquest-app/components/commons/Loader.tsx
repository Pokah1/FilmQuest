export default function Loader() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#080A0D",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 20
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "2px solid rgba(226,214,9,0.15)",
          borderTop: "2px solid #E2D609",
          animation: "spin 0.9s linear infinite"
        }}
      />

      <p style={{
        color: "rgba(255,255,255,0.3)",
        fontFamily: "sans-serif",
        fontSize: 11,
        letterSpacing: "0.3em",
        textTransform: "uppercase"
      }}>
        Fetching
      </p>
    </div>
  );
}