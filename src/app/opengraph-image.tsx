import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dev Raval – Software Developer & Flutter Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#060810",
          position: "relative",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Background glow blobs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            right: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(129,140,248,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #34d399 100%)",
          }}
        />

        {/* Avatar circle */}
        <div
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #34d399 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "28px",
            boxShadow: "0 0 40px rgba(56,189,248,0.45)",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#060810",
            }}
          >
            DR
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "16px",
            display: "flex",
            gap: "16px",
          }}
        >
          <span style={{ color: "#f1f5f9" }}>Dev</span>
          <span
            style={{
              background:
                "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #34d399 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Raval
          </span>
        </div>

        {/* Title pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 24px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(15,23,42,0.8)",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 500,
              color: "#94a3b8",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Software Developer & Flutter Engineer
          </span>
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "18px",
            color: "#64748b",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Building scalable, AI-powered mobile applications with Flutter, Firebase & Gemini API
        </div>

        {/* Tech tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          {["Flutter", "Firebase", "Gemini AI", "Dart"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "6px 16px",
                borderRadius: "999px",
                background: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.2)",
                color: "#38bdf8",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: "28px",
            color: "#334155",
            fontSize: "15px",
            letterSpacing: "0.05em",
          }}
        >
          devraval.com
        </div>
      </div>
    ),
    { ...size }
  );
}
