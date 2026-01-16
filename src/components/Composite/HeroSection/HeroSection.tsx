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
    <section className="flex w-full max-w-180 flex-col items-center justify-start gap-6 self-center md:items-start md:gap-18 md:self-start">
      <p className="hidden font-mono text-sm md:block md:text-md">
        UNIVERSITY OF AUCKLAND
        <br />
        COMPUTER SCIENCE SOCIETY
        <br />
        2023 - 2025
      </p>
      <div className="flex flex-col justify-center gap-12 md:justify-start">
        <div className="flex flex-col justify-center gap-6 text-center md:gap-12 md:text-left">
          <div className="w-max max-w-screen self-center md:self-start">
            <Heading className="md:justify-start md:text-left" h={2}>
              Connecting Lives
            </Heading>
            <Heading className="md:justify-start md:text-left" h={2} period>
              Around Campus
            </Heading>
            <div className="mt-1.5 hidden h-1.5 w-full bg-linear-to-r from-primary to-[#2134FF00] md:block" />
          </div>
          <p className="font-light leading-[100%]">
            UOACS is the Computer Science student association for social gathering.
          </p>
        </div>
        <nav
          aria-label="Social media links"
          className="flex w-fit items-start gap-2 self-center md:gap-4 md:self-start"
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
    </section>
  )
}
