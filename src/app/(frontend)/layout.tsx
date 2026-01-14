import { config } from "@fortawesome/fontawesome-svg-core"
import { faDiscord, faInstagram, faLinkedin, faTiktok } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Inter_Tight } from "next/font/google"
import localFont from "next/font/local"
import type React from "react"
import { Footer, Navbar } from "@/components/Composite"
import type { DropdownOptionProps } from "@/components/Primitive/Dropdown/DropdownOption"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "../globals.css"
import type { Viewport } from "next"

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const navbarLinks: { label: string; href: string }[] = [
  { label: "MEET THE TEAM", href: "/team" },
  { label: "OUR SPONSORS", href: "/sponsors" },
]
const navbarSocialLinks: DropdownOptionProps[] = [
  {
    label: (
      <span className="flex items-center gap-2">
        <FontAwesomeIcon className="w-4" icon={faDiscord} /> Discord
      </span>
    ),
    href: "https://discord.gg/xSgqAmGE",
  },
  {
    label: (
      <span className="flex items-center gap-2">
        <FontAwesomeIcon className="w-4" icon={faInstagram} /> Instagram
      </span>
    ),
    href: "https://www.instagram.com/uoacs25/",
  },
  {
    label: (
      <span className="flex items-center gap-2">
        <FontAwesomeIcon className="w-4" icon={faTiktok} /> TikTok
      </span>
    ),
    href: "https://www.tiktok.com/@uoacs?lang=en-GB",
  },
  {
    label: (
      <span className="flex items-center gap-2">
        <FontAwesomeIcon className="w-4" icon={faLinkedin} /> LinkedIn
      </span>
    ),
    href: "https://www.linkedin.com/company/university-of-auckland-compsci-society/posts/?feedView=all",
  },
]

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={`${inter.variable} ${switzer.variable}`} lang="en">
      <body>
        <div className="mx-auto flex w-full max-w-360 flex-col gap-9 px-4 sm:px-10 md:px-20 md:py-6">
          <Navbar links={navbarLinks} socialLinks={navbarSocialLinks} />
          <main className="flex flex-col items-center gap-9 py-9 md:gap-30">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
