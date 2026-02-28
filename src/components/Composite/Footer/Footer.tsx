"use client"

import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import { motion } from "motion/react"
import Link from "next/link"
import { Button, SocialIcon } from "@/components/Primitive"
import { cn } from "@/lib/utils"
import type { SocialLink } from "../Navbar/Navbar"
import { NavbarGradient } from "../Navbar/NavbarGradient"

/**
 * Props for the {@link Footer} component
 */
export interface FooterProps {
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
 * Reusable button component to be used in the Footer
 * Extracted to ensure consistency, and avoid code duplication
 *
 * @param className optional additional class names to apply to the button
 */
const InterestedButton = ({ className }: { className?: string }) => (
  <Link href="/sign-up">
    <Button
      className={cn("whitespace-nowrap", className)}
      right={<ArrowUpRightIcon className="h-4 w-4 text-white" />}
      theme="primary"
    >
      Interested? Join UOACS
    </Button>
  </Link>
)

/**
 * A footer component for the website, containing links and social media icons.
 *
 * @param links Links to be displayed in the center of the navbar.
 * @param socialLinks Social links to be displayed in the dropdown on the right of the navbar's middle.
 */
export const Footer = ({ links, socialLinks }: FooterProps) => {
  return (
    <footer className="relative grid w-full grid-cols-1 gap-4 bg-gray-800 p-5 text-white md:grid-cols-4 md:p-6">
      <NavbarGradient className="h-full translate-y-2/3 md:h-full md:translate-y-5/6" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row flex-wrap items-start justify-between gap-2">
          <p className="paragraph-sm text-gray-400">UOACS &copy; {new Date().getFullYear()}</p>
          <InterestedButton className="md:hidden" />
        </div>
        <nav aria-label="Social media links" className="flex flex-row items-start gap-4">
          {socialLinks.map(({ icon, label, href }) => (
            <a
              aria-label={`Visit our ${label}`}
              href={href}
              key={label}
              rel="noopener noreferrer"
              target="_blank"
            >
              <SocialIcon className="h-5 w-5" icon={icon} />
            </a>
          ))}
        </nav>
      </div>

      <nav aria-label="Footer navigation" className="hidden flex-col items-start gap-4 md:flex">
        <p className="paragraph-sm text-gray-400">Pages</p>
        {links.map(({ label, href }) => (
          <Link className="w-fit" href={href} key={label}>
            <motion.div initial="initial" whileHover="hover">
              <p className="paragraph-sm font-medium">{label}</p>
              <motion.div
                className="h-px bg-gray-300"
                variants={{
                  initial: {
                    width: "0px",
                  },
                  hover: {
                    width: "100%",
                  },
                }}
              />
            </motion.div>
          </Link>
        ))}
      </nav>

      <div className="hidden md:block" />

      <div className="relative hidden md:block">
        <InterestedButton className="absolute top-0 right-0" />
      </div>
    </footer>
  )
}
