import localFont from "next/font/local"
import type React from "react"
import { Toaster } from "sonner"
import { Footer, Navbar } from "@/components/Composite"
import "../globals.css"
import type { Metadata, Viewport } from "next"
import { SOCIAL_LINKS } from "@/lib/constants"
import { ApiRoutes, Routes } from "@/lib/routes"

const inter = localFont({
  src: "../../../public/fonts/InterTight-Variable.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
})

const switzer = localFont({
  src: "../../../public/fonts/Switzer-Variable.woff2",
  weight: "100 900",
  variable: "--font-switzer",
  display: "swap",
})

const mono = localFont({
  src: [
    {
      path: "../../../public/fonts/IBMPlexMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/IBMPlexMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000"),
  description: "University of Auckland Computer Society - Join our community of CS students!",
  title: {
    default: "UOACS",
    template: "%s - UOACS",
  },
  openGraph: {
    siteName: "UOACS",
    type: "website",
    locale: "en_NZ",
    images: [
      {
        url: ApiRoutes.og,
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [ApiRoutes.og],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const navbarLinks: { label: string; href: string }[] = [
  { label: "Home", href: Routes.home },
  { label: "Meet The Team", href: Routes.team },
  { label: "Our Sponsors", href: Routes.sponsors },
]

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      className={`${inter.variable} ${switzer.variable} ${mono.variable} overflow-x-hidden`}
      lang="en"
    >
      <body className="relative flex min-h-screen flex-col overflow-x-hidden">
        <Toaster />
        <div className="mx-auto flex w-full max-w-[1480px] grow flex-col gap-14 px-4 py-6 md:gap-9 md:px-12 lg:px-20">
          <Navbar links={navbarLinks} socialLinks={SOCIAL_LINKS} />
          <main className="flex grow flex-col items-center gap-14 py-9 md:gap-30">{children}</main>
        </div>
        <Footer links={navbarLinks} socialLinks={SOCIAL_LINKS} />
      </body>
    </html>
  )
}
