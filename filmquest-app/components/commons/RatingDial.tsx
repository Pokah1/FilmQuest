import React from "react";

interface Props {
  value: number;
}

export default function RatingDial({ value }: Props) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const pct = (value / 10) * circumference;
  const color = value >= 7 ? "#E2D609" : value >= 5 ? "#FF8C42" : "#E05C00";

  return (
    <div style={{ position: "relative", width: 80, height: 80 }}>
      <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="5"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - pct}
          style={{ transition: "stroke-dashoffset 1.5s ease 0.8s" }}
        />
      </svg>

      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <span style={{
          fontSize: 20,
          fontWeight: 900,
          color,
          fontFamily: "sans-serif",
          lineHeight: 1
        }}>
          {value.toFixed(1)}
        </span>

        <span style={{
          fontSize: 9,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.1em"
        }}>
          / 10
        </span>
      </div>
    </div>
  );
}