import { faDiscord, faInstagram, faLinkedin, faTiktok } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Heading } from "@/components/Primitive"

/**
 *
 */
export const HeroSection = () => {
  const SOCIAL_LINKS = [
    { icon: faDiscord, label: "Discord", href: "https://discord.gg/xSgqAmGE" },
    { icon: faInstagram, label: "Instagram", href: "https://www.instagram.com/uoacs25/" },
    { icon: faTiktok, label: "TikTok", href: "https://www.tiktok.com/@uoacs?lang=en-GB" },
    {
      icon: faLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/university-of-auckland-compsci-society/posts/?feedView=all",
    },
  ] as const

  return (
    <div className="mr-auto flex w-full max-w-180 flex-col justify-start gap-6 md:gap-18">
      <p className="font-mono text-sm md:text-md">
        UNIVERSITY OF AUCKLAND
        <br />
        COMPUTER SCIENCE SOCIETY
        <br />
        2023 - 2025
      </p>
      <div className="flex flex-col justify-start gap-12">
        <div className="w-max max-w-full">
          <Heading className="justify-start text-left" h={2}>
            Connecting Lives
          </Heading>
          <Heading className="justify-start text-left" h={2} period>
            Around Campus
          </Heading>
          <div className="mt-1.5 h-1.5 w-full bg-linear-to-r from-primary to-[#2134FF00]" />
        </div>
        <p className="font-light leading-[100%]">
          UOACS is the Computer Science student association for social gathering.
        </p>
        <nav
          aria-label="Social media links"
          className="flex flex-wrap items-start gap-2 overflow-x-auto md:gap-4"
        >
          {SOCIAL_LINKS.map(({ icon, label, href }) => (
            <Button
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
                <FontAwesomeIcon className="text-xl md:text-3xl" icon={icon} />
              </a>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
