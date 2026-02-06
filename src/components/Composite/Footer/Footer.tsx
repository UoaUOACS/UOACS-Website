"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import { motion } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/Primitive"
import { cn } from "@/lib/utils"
import type { SocialLink } from "../Navbar/Navbar"

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
  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSdV530DNIMfGaQJwllWgLq22gsZpIutlHU2NwImHjmJyjWrQQ/viewform"
    rel="noopener"
    target="_blank"
  >
    <Button
      className={cn("whitespace-nowrap", className)}
      right={<ArrowUpRightIcon className="h-4 w-4 text-white" />}
      theme="primary"
    >
      Interested? Join UOACS
    </Button>
  </a>
)

/**
 * A footer component for the website, containing links and social media icons.
 *
 * @param links Links to be displayed in the center of the navbar.
 * @param socialLinks Social links to be displayed in the dropdown on the right of the navbar's middle.
 */
export const Footer = ({ links, socialLinks }: FooterProps) => {
  return (
    <footer className="grid w-full grid-cols-1 gap-4 bg-gray-800 p-5 text-white md:grid-cols-4 md:p-6">
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
              <FontAwesomeIcon className="md:text-2xl" fontSize={20} icon={icon} />
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
