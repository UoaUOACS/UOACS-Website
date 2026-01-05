import { Inter_Tight } from "next/font/google"
import localFont from "next/font/local"
import type React from "react"
import "../globals.css"
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { Footer } from "@/components/Composite"

config.autoAddCss = false

const inter = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
})

const switzer = localFont({
  src: "../../../public/fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  display: "swap",
})

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={`${inter.variable} ${switzer.variable}`} lang="en">
      <body>
        <p className="h-24">fake navbar</p>
        {/* TODO: remove mb-48 */}
        <main className="mb-48 flex flex-col items-center gap-9 md:gap-18">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
