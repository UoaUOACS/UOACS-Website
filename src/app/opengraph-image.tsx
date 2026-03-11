import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const runtime = "nodejs"
export const revalidate = false
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const fontsDir = join(process.cwd(), "public", "fonts")

  const [interTightData, switzerData, ibmPlexMonoData, logoSvgData] = await Promise.all([
    readFile(join(fontsDir, "InterTight-SemiBold.ttf")),
    readFile(join(fontsDir, "Switzer-Regular.ttf")),
    readFile(join(fontsDir, "IBMPlexMono-Regular.ttf")),
    readFile(join(process.cwd(), "public", "uoacs-logo.svg")),
  ])

  const logoBase64 = `data:image/svg+xml;base64,${logoSvgData.toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "60px 80px 48px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -950,
          left: 0,
          right: 0,
          height: 1000,
          borderRadius: "25%",
          background: "linear-gradient(180deg, #8A40E7 0%, #C861A7 41%, #F27F76 67%, #FF9961 100%)",
          opacity: 0.35,
          filter: "blur(80px)",
          display: "flex",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 28, zIndex: 1 }}>
        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: 16,
            fontWeight: 400,
            color: "#525252",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          University of Auckland Computer Science Society / Est. 2024
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div
            style={{
              fontFamily: "Inter Tight",
              fontSize: 72,
              fontWeight: 600,
              color: "#171717", // gray-900
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            Connecting Lives
          </div>
          <div
            style={{
              fontFamily: "Inter Tight",
              fontSize: 72,
              fontWeight: 600,
              color: "#171717",
              lineHeight: 1.05,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            <span style={{ display: "flex" }}>Around Campus</span>
          </div>
        </div>

        <div
          style={{
            width: 640,
            height: 4,
            display: "flex",
            borderRadius: 2,
            background:
              "linear-gradient(to right, #FF307C 0%, #9932C0 35%, #d9d0e8 50%, #ffffff 65%)",
          }}
        />

        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: 24,
            fontWeight: 400,
            color: "#525252",
            letterSpacing: "0.08em",
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          Social Events · Technical Workshops · Industry Opportunities
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          zIndex: 1,
        }}
      >
        {/** biome-ignore lint/performance/noImgElement: opengraph image doesn't have a next image */}
        <img alt="UOACS" height={40} src={logoBase64} width={168} />

        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: 18,
            fontWeight: 400,
            color: "#525252",
            letterSpacing: "0.08em",
            display: "flex",
          }}
        >
          uoacs.co.nz
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 1200,
          height: 6,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div style={{ flex: 1, background: "#fa771b", display: "flex" }} />
        <div style={{ flex: 1, background: "#0084d1", display: "flex" }} />
        <div style={{ flex: 1, background: "#7632cd", display: "flex" }} />
        <div style={{ flex: 1, background: "#ff307c", display: "flex" }} />
        <div style={{ flex: 1, background: "#171717", display: "flex" }} />
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
        {
          name: "IBM Plex Mono",
          data: ibmPlexMonoData,
          weight: 400,
          style: "normal",
        },
      ],
    },
  )
}
