"use client"

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { Button, Dropdown } from "@/components/Primitive"
import { MobileNavbar } from "./MobileNavbar/MobileNavbar"
import { NavbarGradient } from "./NavbarGradient"

/**
 * Props for the {@link Navbar} component.
 */
export interface NavbarProps {
  /**
   * Links to be displayed in the center of the navbar.
   */
  links: { label: string; href: string }[]
  /**
   * Social links to be displayed in the dropdown on the right of the navbar's middle.
   */
  socialLinks: SocialLink[]
}

/**
 * A single social link: an icon, a label and a destination.
 */
export interface SocialLink {
  label: string
  icon: IconDefinition
  href: string
  onClick?: () => void
}

/**
 * A Navbar component that includes a logo, navigation links, social media dropdown, and a join button.
 *
 * @param links Links to be displayed in the center of the navbar.
 * @param socialLinks Social links to be displayed in the dropdown on the right of the navbar's middle.
 * @returns A Navbar component with logo, navigation links, social dropdown, and join button.
 */
export function Navbar({ links, socialLinks }: NavbarProps) {
  const dropdownOptions = socialLinks.map((socialLink) => ({
    label: (
      <span className="flex items-center gap-2">
        <FontAwesomeIcon className="w-4" icon={socialLink.icon} />
        {socialLink.label}
      </span>
    ),
    href: socialLink.href,
    onClick: socialLink.onClick,
  }))

  return (
    <>
      <NavbarGradient />
      <nav className="flex flex-row items-center justify-between">
        <motion.div layoutId="navbar-logo">
          <Link className="z-60" href="/">
            <Image alt="UOACS Logo" height={40} src="/uoacs-logo-bw.svg" width={167} />
          </Link>
        </motion.div>
        <MobileNavbar links={links} socialLinks={socialLinks} />
        <div className="hidden flex-row items-center gap-3 md:flex">
          <div className="nowrap flex h-fit flex-row rounded-2xl bg-white">
            {links
              .filter((link) => link.label.toLowerCase() !== "home")
              .map((link) => (
                <Link className="rounded-2xl" href={link.href} key={link.href}>
                  <Button
                    left={<div className="h-2 w-3 rounded-xs bg-primary" />}
                    variant={{ size: "navbar", theme: "ghost", border: "none" }}
                  >
                    {link.label.toUpperCase()}
                  </Button>
                </Link>
              ))}
          </div>
          <Dropdown
            label="SOCIALS"
            options={dropdownOptions}
            optionVariant={{ size: "sm" }}
            triggerVariant={{ size: "navbar", border: "none" }}
            variant={{ size: "md" }}
          />
        </div>
        <a
          className="hidden lg:block"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdV530DNIMfGaQJwllWgLq22gsZpIutlHU2NwImHjmJyjWrQQ/viewform"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button
            left={<div className="h-2.5 w-2.5 rounded-[0.92px] bg-white" />}
            variant={{ size: "sm", theme: "dark" }}
          >
            JOIN US
          </Button>
        </a>
      </nav>
    </>
  )
}
