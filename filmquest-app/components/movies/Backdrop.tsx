interface Props {
  backdropPath: string | null;
  ready: boolean;
  onLoad: () => void;
}

export default function Backdrop({ backdropPath, ready, onLoad }: Props) {
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "75vh",
      zIndex: 0,
      overflow: "hidden"
    }}>
      {backdropPath && (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img
          src={backdropPath}
          onLoad={onLoad}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: ready ? 0.2 : 0,
            transition: "opacity 1.5s ease"
          }}
        />
      )}

      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to right, #080A0D 30%, transparent)"
      }} />

      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, transparent 40%, #080A0D)"
      }} />
    </div>
  );
}