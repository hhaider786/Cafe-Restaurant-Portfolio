import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lumière — Fine Dining & Bar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 20% 30%, #2a1a08 0%, #12100a 60%)",
          color: "#f5ead8",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", letterSpacing: 14, fontSize: 22, color: "#e8be63" }}>LUMIÈRE</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 24, color: "#e8be63", letterSpacing: 6, textTransform: "uppercase" }}>
            Fine Dining · London
          </div>
          <div style={{ fontSize: 92, color: "#f5ead8", lineHeight: 1.05, letterSpacing: -1 }}>
            Where every bite<br /><i style={{ color: "#e8be63" }}>tells a story.</i>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#a09070" }}>
          <span>14 Rue de la Lumière · W1K 3AA</span>
          <span>4.9 ★ · 482 reviews</span>
        </div>
      </div>
    ),
    size
  );
}
