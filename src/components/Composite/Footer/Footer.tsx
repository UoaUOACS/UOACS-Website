"use client"

import { faDiscord, faInstagram, faLinkedin, faTiktok } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/Primitive"

const SOCIAL_LINKS = [
  { icon: faDiscord, label: "Discord", href: "https://discord.gg/xSgqAmGE" },
  { icon: faInstagram, label: "Instagram", href: "https://www.instagram.com/uoacs25/" },
  { icon: faTiktok, label: "TikTok", href: "https://www.tiktok.com/@uoacs?lang=en-GB" },
  {
    icon: faLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/university-of-auckland-compsci-society/posts/?feedView=all",
  },
] as const

const NAV_LINKS = [
  // empty for now, add the necessary routes when they are created
  { label: "Home", href: "/" },
  { label: "Meet the team", href: "/" },
  { label: "Our sponsors", href: "/" },
] as const

export function Footer() {
  return (
    <footer className="relative h-[300px] w-full bg-[#1A1A1A] p-7 text-white">
      <div className="flex h-full flex-col">
        <nav aria-label="Social media links" className="flex h-1/2 items-start gap-4">
          {SOCIAL_LINKS.map(({ icon, label, href }) => (
            <Button
              aria-label={label}
              key={label}
              variant={{ border: true, size: "sm", theme: "primary" }}
            >
              <a
                aria-label={`Visit our ${label}`}
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon fontSize={16} icon={icon} />
              </a>
            </Button>
          ))}
        </nav>

        <div className="flex h-1/2">
          <div className="flex items-center">
            <Image alt="UOACS Logo" height={150} src="/uoacs-logo.svg" width={150} />
          </div>

          <nav
            aria-label="Main navigation"
            className="flex flex-col justify-end gap-4 pl-20 text-lg"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link className="font-ibm-plex-mono" href={href} key={label} target="_blank">
                {label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex flex-1 items-end justify-end">
            <Button variant={{ border: true, size: "sm", theme: "primary" }}>
              INTERESTED? JOIN US
            </Button>
          </div>
        </div>
      </div>

      <Image
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0"
        height={850}
        src="/uoacs-gradient.svg"
        width={850}
      />
    </footer>
  )
}
