import { Inter_Tight } from "next/font/google"
import type React from "react"
import "../globals.css"

const inter = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  description: "A blank template using Payload in a Next.js app.",
  title: "Payload Blank Template",
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={inter.variable} lang="en">
      <body>
        <main className="flex w-full flex-col justify-center">{children}</main>
      </body>
    </html>
  )
}
