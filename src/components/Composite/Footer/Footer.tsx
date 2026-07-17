"use client"

import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { type SocialLink, SocialLinks } from "@/components/Generic"
import { Button, SocialIcon } from "@/components/Primitive"
import { Routes } from "@/lib/routes"
import { cn, shuffle } from "@/lib/utils"
import type { DiscordWidgetData } from "@/types/discord"
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
  /**
   * Data for the Discord widget to be displayed in the footer.
   */
  discordWidgetData: DiscordWidgetData | null
}

/**
 * Reusable button component to be used in the Footer
 * Extracted to ensure consistency, and avoid code duplication
 *
 * @param className optional additional class names to apply to the button
 */
const InterestedButton = ({ className }: { className?: string }) => (
  <Link href={Routes.SIGN_UP}>
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
 * @param discordWidgetData Data for the Discord widget to be displayed in the footer.
 */
const AVATAR_SIZE = 32
const AVATAR_OVERLAP = 12
const AVATAR_STEP = AVATAR_SIZE - AVATAR_OVERLAP
const AVATAR_MIN_VISIBLE_COUNT = 4

export const Footer = ({ links, socialLinks, discordWidgetData }: FooterProps) => {
  const discordHref = socialLinks.find((link) => link.icon === "discord")?.href
  const [avatarMembers, setAvatarMembers] = useState(
    () => discordWidgetData?.members.slice(0, 8) ?? [],
  )
  const avatarContainerRef = useRef<HTMLDivElement>(null)
  const [visibleAvatarCount, setVisibleAvatarCount] = useState(0)

  useEffect(() => {
    if (!discordWidgetData) return
    setAvatarMembers(shuffle(discordWidgetData.members).slice(0, 8))
  }, [discordWidgetData])

  useEffect(() => {
    const container = avatarContainerRef.current
    if (!container) return

    const updateVisibleCount = () => {
      const width = container.clientWidth
      const fitCount = width < AVATAR_SIZE ? 0 : Math.floor((width - AVATAR_SIZE) / AVATAR_STEP) + 1
      const count = fitCount < AVATAR_MIN_VISIBLE_COUNT ? 0 : fitCount
      setVisibleAvatarCount(Math.max(0, Math.min(avatarMembers.length, count)))
    }

    updateVisibleCount()
    const observer = new ResizeObserver(updateVisibleCount)
    observer.observe(container)
    return () => observer.disconnect()
  }, [avatarMembers.length])

  return (
    <footer className="relative grid w-full grid-cols-1 gap-4 bg-gray-800 p-5 text-white md:grid-cols-4 md:p-6">
      <NavbarGradient className="h-full translate-y-1/3 md:h-full md:translate-y-5/6" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row flex-wrap items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <p className="paragraph-sm text-gray-400">UOACS &copy; {new Date().getFullYear()}</p>
            <Link
              className="paragraph-xs w-fit text-gray-400 transition-colors hover:text-white"
              href={Routes.PRIVACY}
            >
              Privacy Policy
            </Link>
          </div>
          <InterestedButton className="md:hidden" />
        </div>
        <nav aria-label="Social media links" className="flex flex-row items-start gap-4">
          <SocialLinks
            links={socialLinks.filter((link) => link.icon !== "discord")}
            variant="footer"
          />
        </nav>
      </div>

      <div className="flex flex-row items-center justify-between gap-2 md:flex-col md:items-start md:justify-start md:gap-4">
        <div className="flex shrink-0 flex-row items-center gap-2">
          <SocialIcon.Discord className="h-6 w-6" />
          {discordWidgetData && (
            <p className="paragraph-sm">{discordWidgetData.presence_count} Online</p>
          )}
        </div>
        {avatarMembers.length > 0 && (
          <div
            className="flex flex-1 flex-row justify-center overflow-hidden md:w-full md:flex-none md:justify-start"
            ref={avatarContainerRef}
          >
            {avatarMembers.slice(0, visibleAvatarCount).map((member, i) => (
              <Image
                alt={member.username}
                className={cn("h-8 w-8 rounded-full border-2 border-gray-800", i > 0 && "-ml-3")}
                height={32}
                key={member.id}
                src={member.avatar_url}
                style={{ zIndex: avatarMembers.length - i }}
                width={32}
              />
            ))}
          </div>
        )}
        <a className="shrink-0" href={discordWidgetData?.instant_invite ?? discordHref ?? ""}>
          <Button
            className="paragraph-sm"
            right={<ArrowUpRightIcon className="h-3 w-3" />}
            theme="primary"
          >
            Join Discord
          </Button>
        </a>
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

      <div className="relative hidden md:block">
        <InterestedButton className="absolute top-0 right-0" />
      </div>
    </footer>
  )
}
