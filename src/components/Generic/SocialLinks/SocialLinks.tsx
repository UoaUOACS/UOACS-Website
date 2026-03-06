import { BorderButton, SocialIcon, type SocialIconName } from "@/components/Primitive"
import { type SocialLinksVariantProps, socialLinksVariants } from "./SocialLinks.variants"

export interface SocialLink {
  icon: SocialIconName
  label: string
  href: string
}

export interface SocialLinksProps extends SocialLinksVariantProps {
  links: SocialLink[]
}

export const SocialLinks = ({ links, variant }: SocialLinksProps) => {
  const { container, icon } = socialLinksVariants({ variant })
  return (
    <nav aria-label="Social media links" className={container()}>
      {links.map(({ icon: iconName, label, href }) =>
        variant === "footer" ? (
          <a
            aria-label={`Visit our ${label}`}
            href={href}
            key={label}
            rel="noopener noreferrer"
            target="_blank"
          >
            <SocialIcon className={icon()} icon={iconName} />
          </a>
        ) : (
          <BorderButton
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
              <SocialIcon className={icon()} icon={iconName} />
            </a>
          </BorderButton>
        ),
      )}
    </nav>
  )
}
