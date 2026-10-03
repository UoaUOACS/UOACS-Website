import { Toaster } from "@uoacs/ui/toast"
import type { Metadata } from "next"
import localFont from "next/font/local"
import Image from "next/image"
import type React from "react"
import "../globals.css"

const inter = localFont({
  src: "../../../../../packages/ui/src/styles/fonts/InterTight-Variable.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "optional",
})

const switzer = localFont({
  src: "../../../../../packages/ui/src/styles/fonts/Switzer-Variable.woff2",
  weight: "100 900",
  variable: "--font-switzer",
  display: "optional",
})

const mono = localFont({
  src: [
    {
      path: "../../../../../packages/ui/src/styles/fonts/IBMPlexMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../../packages/ui/src/styles/fonts/IBMPlexMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "optional",
})

export const metadata: Metadata = {
  title: {
    default: "UOACS",
    template: "%s - UOACS",
  },
  description: "Log in or sign up to the University of Auckland Computer Society.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className={`${inter.variable} ${switzer.variable} ${mono.variable} overflow-x-hidden`}
      lang="en"
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <Toaster />
        <div className="mx-auto flex w-full max-w-lg grow flex-col items-center gap-9 px-4 py-6 md:py-12">
          <a href={process.env.NEXT_PUBLIC_WEBSITE_URL}>
            <Image alt="UOACS Logo" height={40} loading="eager" src="/uoacs-logo.svg" width={168} />
          </a>
          <main className="flex w-full grow flex-col items-center">{children}</main>
        </div>
      </body>
    </html>
  )
}
