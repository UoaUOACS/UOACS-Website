import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import { Button, SocialIcon, type SocialIconName } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import Link from "next/link"

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

/**
 * A footer component for the project playground, containing links and social media icons.
 * Static/presentational only — no live Discord widget or session-aware state, since
 * playground doesn't yet have that surrounding infrastructure.
 *
 * @param links Links to be displayed in the "Pages" column of the footer.
 * @param socialLinks Social links to be displayed as icons in the footer, including Discord.
 */
export const Footer = ({ links, socialLinks }: FooterProps) => {
  const discordHref = socialLinks.find((link) => link.icon === "discord")?.href

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

      {discordHref && (
        <div className="flex flex-row items-center justify-between gap-2 md:flex-col md:items-start md:justify-start md:gap-4">
          <div className="flex shrink-0 flex-row items-center gap-2">
            <SocialIcon className="h-6 w-6" icon="discord" />
          </div>
          <a className="shrink-0" href={discordHref} rel="noopener noreferrer" target="_blank">
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
