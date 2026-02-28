import { BorderButton, Heading, SOCIAL_ICONS, SocialIcon } from "@/components/Primitive"

/**
 * HeroSection component for the homepage.
 */
export const HeroSection = () => {
  const SOCIAL_LINKS = [
    { icon: SOCIAL_ICONS.Discord, label: "Discord", href: "https://discord.gg/HsG73WdWFm" },
    {
      icon: SOCIAL_ICONS.Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/uoacs25/",
    },
    {
      icon: SOCIAL_ICONS.TikTok,
      label: "TikTok",
      href: "https://www.tiktok.com/@uoacs?lang=en-GB",
    },
    {
      icon: SOCIAL_ICONS.LinkedIn,
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/university-of-auckland-compsci-society/posts/?feedView=all",
    },
  ] as const

  const START_YEAR = 2024

  return (
    <section className="flex w-full max-w-180 flex-col items-center justify-start gap-6 self-center md:items-start md:gap-18 md:self-start">
      <p className="hidden font-mono md:block">
        UNIVERSITY OF AUCKLAND
        <br />
        COMPUTER SCIENCE SOCIETY
        <br />
        EST. {START_YEAR}
      </p>
      <div className="flex flex-col justify-center gap-12 md:max-w-[32rem] md:justify-start">
        <div className="flex flex-col justify-center gap-6 text-center md:gap-12 md:text-left">
          <div className="self-center md:self-start">
            <Heading className="md:justify-start md:text-left" h={2}>
              Connecting Lives
            </Heading>
            <Heading className="md:justify-start md:text-left" h={2} period>
              Around Campus
            </Heading>
          </div>
          <p className="paragraph md:max-w-[28rem]">
            UOACS is the Computer Science student association for social gathering.
          </p>
        </div>
        <div className="mask-[linear-gradient(to_right,white,transparent)] hidden h-1.5 w-full bg-linear-to-r from-[#FF307C] to-[#2134FF] md:block" />
        <nav
          aria-label="Social media links"
          className="flex w-fit items-start gap-2 self-center md:gap-4 md:self-start"
        >
          {SOCIAL_LINKS.map(({ icon, label, href }) => (
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
                <SocialIcon className="h-6 w-6 md:h-7 md:w-7" icon={icon} />
              </a>
            </BorderButton>
          ))}
        </nav>
      </div>
    </section>
  )
}
