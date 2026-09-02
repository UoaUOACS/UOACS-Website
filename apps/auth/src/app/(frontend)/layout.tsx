import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "UOACS Auth",
  description: "Authentication service for the University of Auckland Computer Society.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
