import { Inter_Tight } from "next/font/google"
import localFont from "next/font/local"
import type React from "react"
import { Toaster } from "sonner"
import { Footer, Navbar } from "@/components/Composite"
import "../globals.css"
import type { Metadata, Viewport } from "next"
import { SOCIAL_LINKS } from "@/lib/constants"

const inter = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
})

const switzer = localFont({
  src: "../../../public/fonts/Switzer-Variable.woff2",
  variable: "--font-switzer",
  display: "swap",
})

export const metadata: Metadata = {
  description: "University of Auckland Computer Society - Join our community of CS students!",
  title: {
    default: "UOACS",
    template: "%s - UOACS",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const navbarLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Meet The Team", href: "/team" },
  { label: "Our Sponsors", href: "/sponsors" },
]

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={`${inter.variable} ${switzer.variable} overflow-x-hidden`} lang="en">
      <body className="relative flex min-h-[100dvh] flex-col overflow-x-hidden">
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
