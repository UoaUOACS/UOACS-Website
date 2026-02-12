import { Inter_Tight } from "next/font/google"
import localFont from "next/font/local"
import type React from "react"
import { Footer, Navbar } from "@/components/Composite"
import type { SocialLink } from "@/components/Composite/Navbar/Navbar"
import "../globals.css"
import type { Metadata, Viewport } from "next"
import { SOCIAL_ICONS } from "@/components/Primitive"

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
const navbarSocialLinks: SocialLink[] = [
  { label: "Discord", icon: SOCIAL_ICONS.Discord, href: "https://discord.gg/xSgqAmGE" },
  { label: "Instagram", icon: SOCIAL_ICONS.Instagram, href: "https://www.instagram.com/uoacs25/" },
  { label: "TikTok", icon: SOCIAL_ICONS.TikTok, href: "https://www.tiktok.com/@uoacs?lang=en-GB" },
  {
    label: "LinkedIn",
    icon: SOCIAL_ICONS.LinkedIn,
    href: "https://www.linkedin.com/company/university-of-auckland-compsci-society/posts/?feedView=all",
  },
]

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={`${inter.variable} ${switzer.variable} overflow-x-hidden`} lang="en">
      <body className="relative overflow-x-hidden">
        <div className="mx-auto flex w-full max-w-360 flex-col gap-14 px-4 py-6 md:gap-9 md:px-12 lg:px-20">
          <Navbar links={navbarLinks} socialLinks={navbarSocialLinks} />
          <main className="flex flex-col items-center gap-14 py-9 md:gap-30">{children}</main>
        </div>
        <Footer links={navbarLinks} socialLinks={navbarSocialLinks} />
      </body>
    </html>
  )
}
