import { config } from "@fortawesome/fontawesome-svg-core"
import { faDiscord, faInstagram, faLinkedin, faTiktok } from "@fortawesome/free-brands-svg-icons"
import { Inter_Tight } from "next/font/google"
import localFont from "next/font/local"
import type React from "react"
import { Footer, Navbar } from "@/components/Composite"
import type { SocialLink } from "@/components/Composite/Navbar/Navbar"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "../globals.css"
import type { Metadata, Viewport } from "next"

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
  { label: "Discord", icon: faDiscord, href: "https://discord.gg/xSgqAmGE" },
  { label: "Instagram", icon: faInstagram, href: "https://www.instagram.com/uoacs25/" },
  { label: "TikTok", icon: faTiktok, href: "https://www.tiktok.com/@uoacs?lang=en-GB" },
  {
    label: "LinkedIn",
    icon: faLinkedin,
    href: "https://www.linkedin.com/company/university-of-auckland-compsci-society/posts/?feedView=all",
  },
]

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={`${inter.variable} ${switzer.variable} overflow-x-hidden`} lang="en">
      <body className="relative overflow-x-hidden">
        <div className="mx-auto flex w-full max-w-360 flex-col gap-14 md:gap-9 px-4 py-6 md:px-12 lg:px-20">
          <Navbar links={navbarLinks} socialLinks={navbarSocialLinks} />
          <main className="flex flex-col items-center gap-14 py-9 md:gap-30">{children}</main>
        </div>
        <Footer links={navbarLinks} socialLinks={navbarSocialLinks} />
      </body>
    </html>
  )
}
