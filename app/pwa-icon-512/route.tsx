import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 116, background: "linear-gradient(140deg, #0b1728 0%, #174d61 55%, #4f4697 100%)", color: "#e9ffff", fontSize: 190, fontWeight: 900, letterSpacing: -14 }}>
      AI HUB
    </div>, { width: 512, height: 512 });
}