import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import { AuthPages, authPageUrl } from "@uoacs/shared"
import { AnimatedSuspense, Button, SocialIcon, type SocialIconName } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import Link from "next/link"
import { DiscordSection, DiscordSectionSkeleton } from "../DiscordSection"
import { CopyrightYear } from "./CopyrightYear"

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
 * Placeholder until playground has a privacy policy route of its own.
 */
const PRIVACY_HREF = "/"

const InterestedButton = ({ className }: { className?: string }) => (
  // A plain <a>, not next/link, because the auth app is on a different origin.
  // Footer is a server component with no pathname, so return to the playground home.
  <a href={authPageUrl(AuthPages.SIGN_UP, `${process.env.NEXT_PUBLIC_PROJECTS_URL}/`)}>
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
 * A footer component for the project playground, containing links and social media icons.
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
            <p className="paragraph-sm text-gray-400">
              UOACS &copy; <CopyrightYear />
            </p>
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

      <AnimatedSuspense fallback={<DiscordSectionSkeleton />}>
        <DiscordSection discordHref={discordHref} />
      </AnimatedSuspense>

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
