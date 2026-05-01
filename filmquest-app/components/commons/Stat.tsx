interface Props {
  label: string;
  value: string;
}

export default function Stat({ label, value }: Props) {
  return (
    <div style={{
      padding: "12px 20px",
      border: "1px solid rgba(226,214,9,0.15)",
      borderRadius: 4,
      background: "rgba(255,255,255,0.03)",
      backdropFilter: "blur(8px)",
      minWidth: 100,
    }}>
      <p style={{
        margin: "0 0 4px",
        fontSize: 9,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.35)",
        fontFamily: "sans-serif"
      }}>
        {label}
      </p>

      <p style={{
        margin: 0,
        fontSize: 15,
        fontWeight: 700,
        color: "#fff",
        fontFamily: "sans-serif"
      }}>
        {value}
      </p>
    </div>
  );
}