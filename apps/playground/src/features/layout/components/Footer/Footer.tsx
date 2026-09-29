"use client"

import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import { Button, SocialIcon, type SocialIconName } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import type { DiscordWidgetData } from "../../schemas/discord"

export interface FooterSocialLink {
  icon: SocialIconName
  label: string
  href: string
}

export interface FooterProps {
  /**
   * Links to be displayed in the "Pages" column of the footer.
   */
  links: { label: string; href: string }[]
  /**
   * Social links to be displayed as icons in the footer, including Discord.
   */
  socialLinks: FooterSocialLink[]
  /**
   * Data for the Discord widget to be displayed in the footer.
   */
  discordWidgetData: DiscordWidgetData | null
}

/**
 * Placeholder until playground has a sign-up route of its own.
 */
const JOIN_HREF = "/"

/**
 * Placeholder until playground has a privacy policy route of its own.
 */
const PRIVACY_HREF = "/"

const InterestedButton = ({ className }: { className?: string }) => (
  <Link href={JOIN_HREF}>
    <Button
      className={cn("whitespace-nowrap", className)}
      right={<ArrowUpRightIcon className="h-4 w-4 text-white" />}
      theme="primary"
    >
      Interested? Join UOACS
    </Button>
  </Link>
)

const shuffle = <T,>(items: T[]): T[] => {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const AVATAR_SIZE = 32
const AVATAR_OVERLAP = 12
const AVATAR_STEP = AVATAR_SIZE - AVATAR_OVERLAP
const AVATAR_MIN_VISIBLE_COUNT = 4

/**
 * A footer component for the project playground, containing links and social media icons.
 *
 * @param links Links to be displayed in the "Pages" column of the footer.
 * @param socialLinks Social links to be displayed as icons in the footer, including Discord.
 * @param discordWidgetData Data for the Discord widget to be displayed in the footer.
 */
export const Footer = ({ links, socialLinks, discordWidgetData }: FooterProps) => {
  const discordHref = socialLinks.find((link) => link.icon === "discord")?.href
  const joinDiscordHref = discordWidgetData?.instant_invite ?? discordHref
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
    <footer className="grid w-full grid-cols-1 gap-4 bg-gray-800 p-5 text-white md:grid-cols-4 md:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row flex-wrap items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <p className="paragraph-sm text-gray-400">UOACS &copy; {new Date().getFullYear()}</p>
            <Link
              className="paragraph-xs w-fit text-gray-400 transition-colors hover:text-white"
              href={PRIVACY_HREF}
            >
              Privacy Policy
            </Link>
          </div>
          <InterestedButton className="md:hidden" />
        </div>
        <nav aria-label="Social media links" className="flex flex-row items-start gap-4">
          {socialLinks
            .filter(({ icon }) => icon !== "discord")
            .map(({ icon, label, href }) => (
              <a
                aria-label={`Visit our ${label}`}
                className="flex flex-row items-center gap-2"
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

      {joinDiscordHref && (
        <div className="flex flex-row items-center justify-between gap-2 md:flex-col md:items-start md:justify-start md:gap-4">
          <div className="flex shrink-0 flex-row items-center gap-2">
            <SocialIcon className="h-6 w-6" icon="discord" />
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
          <a className="shrink-0" href={joinDiscordHref} rel="noopener noreferrer" target="_blank">
            <Button
              className="paragraph-sm"
              right={<ArrowUpRightIcon className="h-3 w-3" />}
              theme="primary"
            >
              Join Discord
            </Button>
          </a>
        </div>
      )}

      <nav aria-label="Footer navigation" className="hidden flex-col items-start gap-4 md:flex">
        <p className="paragraph-sm text-gray-400">Pages</p>
        {links.map(({ label, href }) => (
          <Link className="paragraph-sm w-fit font-medium hover:underline" href={href} key={label}>
            {label}
          </Link>
        ))}
      </nav>

      <div className="relative hidden md:block">
        <InterestedButton className="absolute top-0 right-0" />
      </div>
    </footer>
  )
}
