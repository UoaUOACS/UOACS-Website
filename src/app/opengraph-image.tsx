import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const runtime = "nodejs"
export const revalidate = false
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const fontsDir = join(process.cwd(), "public", "fonts")

  const [interTightData, switzerData, logoSvgData] = await Promise.all([
    readFile(join(fontsDir, "InterTight-SemiBold.woff2")),
    readFile(join(fontsDir, "Switzer-Variable.woff2")),
    readFile(join(process.cwd(), "public", "uoacs-logo.svg")),
  ])

  const logoBase64 = `data:image/svg+xml;base64,${logoSvgData.toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -180,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "radial-gradient(circle, #8A40E7 0%, #C861A7 55%, transparent 80%)",
          opacity: 0.5,
          display: "flex",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div
          style={{
            fontFamily: "Switzer",
            fontSize: 14,
            fontWeight: 400,
            color: "#a1a1a1",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          University of Auckland / Computer Science Society / Est. 2024
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div
            style={{
              fontFamily: "Inter Tight",
              fontSize: 88,
              fontWeight: 600,
              color: "#fafafa",
              lineHeight: 1,
              display: "flex",
            }}
          >
            Connecting Lives /
          </div>
          <div
            style={{
              fontFamily: "Inter Tight",
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1,
              display: "flex",
              alignItems: "baseline",
              gap: 0,
            }}
          >
            <span style={{ color: "#fafafa" }}>Around Campus</span>
            <span style={{ color: "#ff307c" }}>■</span>
          </div>
        </div>

        <div
          style={{
            width: 400,
            height: 2,
            background: "linear-gradient(to right, #FF307C, #2134FF, transparent)",
            display: "flex",
          }}
        />

        <div
          style={{
            fontFamily: "Switzer",
            fontSize: 18,
            fontWeight: 400,
            color: "#a1a1a1",
            display: "flex",
          }}
        >
          UOACS is the Computer Science student association for social gathering.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="UOACS" height={40} src={logoBase64} width={168} />

        <div
          style={{
            fontFamily: "Switzer",
            fontSize: 18,
            fontWeight: 400,
            color: "#525252",
            letterSpacing: "0.04em",
            display: "flex",
          }}
        >
          uoacs.nz
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Inter Tight",
          data: interTightData,
          weight: 600,
          style: "normal",
        },
        {
          name: "Switzer",
          data: switzerData,
          weight: 400,
          style: "normal",
        },
      ],
    },
  )
}
