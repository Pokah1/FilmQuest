interface Props {
  backdropPath: string | null;
  ready: boolean;
  onLoad: () => void;
}

export default function Backdrop({ backdropPath, ready, onLoad }: Props) {
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0,
      height: "70vh", zIndex: 0, overflow: "hidden",
      pointerEvents: "none",
    }}>
      {backdropPath && (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img
          src={backdropPath}
          onLoad={onLoad}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            objectPosition: "top",
            opacity: ready ? 0.18 : 0,
            transition: "opacity 1.5s ease",
          }}
        />
      )}
      {/* Left fade — stronger on mobile */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #080A0D 20%, rgba(8,10,13,0.6) 60%, transparent 100%)" }} />
      {/* Bottom fade */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, #080A0D 100%)" }} />
      {/* Top fade */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #080A0D 0%, transparent 15%)" }} />
    </div>
  );
}