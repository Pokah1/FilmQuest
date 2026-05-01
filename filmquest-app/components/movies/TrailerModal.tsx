export default function TrailerModal({
  trailerKey,
  onClose
}: {
  trailerKey: string;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.95)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
          style={{ width: "90vw", height: "80vh", border: "none" }}
          allow="autoplay; encrypted-media; fullscreen"
        />
      </div>
    </div>
  );
}