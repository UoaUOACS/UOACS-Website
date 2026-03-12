import { type SocialLink, SocialLinks } from "@/components/Generic"
import { Heading } from "@/components/Primitive"

/**
 * HeroSection component for the homepage.
 */
export const HeroSection = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
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
        <SocialLinks links={socialLinks} />
      </div>
    </section>
  )
}
