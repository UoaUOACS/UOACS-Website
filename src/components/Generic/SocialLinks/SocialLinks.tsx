import { BorderButton, SocialIcon, type SocialIconName } from "@/components/Primitive"
import { type SocialLinksVariantProps, socialLinksVariants } from "./SocialLinks.variants"

export interface SocialLink {
  icon: SocialIconName
  label: string
  href: string
}

export interface SocialLinksProps extends SocialLinksVariantProps {
  links: SocialLink[]
  activeDiscord?: boolean
  discordPresenceCount?: number | null
}

export const SocialLinks = ({
  links,
  variant,
  activeDiscord = false,
  discordPresenceCount = null,
}: SocialLinksProps) => {
  const { container, icon } = socialLinksVariants({ variant })
  return (
    <nav aria-label="Social media links" className={container()}>
      {links.map(({ icon: iconName, label, href }) => {
        const badge =
          activeDiscord && iconName === "discord" && discordPresenceCount !== null ? (
            <span key={label}>{discordPresenceCount} ONLINE</span>
          ) : null
        return variant === "footer" ? (
          <a
            aria-label={`Visit our ${label}`}
            className="flex flex-row items-center gap-2"
            href={href}
            key={label}
            rel="noopener noreferrer"
            target="_blank"
          >
            <SocialIcon className={icon()} icon={iconName} />
            {badge}
          </a>
        ) : (
          <BorderButton
            aria-label={label}
            key={label}
            variant={{ border: true, size: "sm", theme: "primary" }}
          >
            <a
              aria-label={`Visit our ${label}`}
              className="flex flex-row items-center gap-4"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              <SocialIcon className={icon()} icon={iconName} />
              {badge}
            </a>
          </BorderButton>
        )
      })}
    </nav>
  )
}
