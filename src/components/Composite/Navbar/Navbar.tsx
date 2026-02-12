"use client"

import { ArrowUpRightIcon, Bars3Icon } from "@heroicons/react/24/solid"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { Button, Dropdown, type SocialIconName } from "@/components/Primitive"
import { SocialIcon } from "@/components/Primitive/Icons"
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
  icon: SocialIconName
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
        {socialLink.label}
        <SocialIcon className="w-4" icon={socialLink.icon} />
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
          <Link className="z-50" href="/">
            <Image alt="UOACS Logo" height={40} src="/uoacs-logo-bw.svg" width={167} />
          </Link>
        </motion.div>
        <MobileNavbar links={links} socialLinks={socialLinks} />
        <div className="nowrap flex hidden flex-row gap-5 md:flex">
          <div className="flex flex-row items-center gap-5">
            {links
              .filter((link) => link.label.toLowerCase() !== "home")
              .map((link) => (
                <Link className="rounded-2xl" href={link.href} key={link.href}>
                  <Button theme="primary">{link.label}</Button>
                </Link>
              ))}
            <Dropdown
              label="Socials"
              options={dropdownOptions}
              theme="primary"
              triggerIcon={<Bars3Icon className="h-4 w-4 md:h-6 md:w-6" />}
            />
          </div>
          <a
            className="hidden lg:block"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdV530DNIMfGaQJwllWgLq22gsZpIutlHU2NwImHjmJyjWrQQ/viewform"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Button right={<ArrowUpRightIcon className="h-4 w-4 md:h-6 md:w-6" />} theme="dark">
              Join UOACS
            </Button>
          </a>
        </div>
      </nav>
    </>
  )
}
