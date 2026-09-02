import type { Metadata } from "next"
import type React from "react"
import "./styles.css"

export const metadata: Metadata = {
  title: "UOACS Auth",
  description: "Authentication service for the University of Auckland Computer Society.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
