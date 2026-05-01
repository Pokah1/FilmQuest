import RatingDial from "@/components/commons/RatingDial";

interface Props {
  posterUrl: string | null;
  title: string;
  rating: number;
  votes: number;
}

export default function PosterSection({
  posterUrl,
  rating,
  votes
}: Props) {
  return (
    <div style={{ flexShrink: 0 }}>

      <div style={{
        width: 300,
        height: 450,
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,0.8)"
      }}>
        {posterUrl ? (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img
            src={posterUrl}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{
            width: "100%",
            height: "100%",
            background: "#1a1d24",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            🎬
          </div>
        )}
      </div>

      {/* RATING */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 20
      }}>
        <div style={{ textAlign: "center" }}>
          <RatingDial value={rating} />
          <p style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.3)"
          }}>
            {votes.toLocaleString()} votes
          </p>
        </div>
      </div>
    </div>
  );
}