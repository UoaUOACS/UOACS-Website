import { IBM_Plex_Mono, Inter_Tight } from "next/font/google"
import type React from "react"
import "../globals.css"

const inter = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
})

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={`${inter.variable} ${ibmPlexMono.variable}`} lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
