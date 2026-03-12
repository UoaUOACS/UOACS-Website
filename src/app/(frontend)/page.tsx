import type { Metadata } from "next"
import { AboutUsSection, HeroSection, ValuesSection, WhoWeAreSection } from "@/components/Composite"
import { getSocialLinks } from "@/lib/helpers"
import { payload, Slugs } from "@/lib/payload"
import type { Reel } from "@/payload/payload-types"
import { SponsorsServerSection } from "./_components/SponsorsServerSection"

export const metadata: Metadata = {
  title: "Home - UOACS",
  description: "University of Auckland Computer Society - Join our community of CS students!",
}

export default async function HomePage() {
  const [homePage, socialLinks] = await Promise.all([
    payload.findGlobal({ slug: Slugs.Globals.homePage }),
    getSocialLinks(),
  ])

  const rawReels = (homePage?.reels ?? []) as (string | Reel | null | undefined)[]
  const resolvedReels: Reel[] = rawReels.filter((reel) => {
    return typeof reel === "object" && reel !== null
  })
  const rawPolaroids = homePage?.polaroids || []
  const resolvedPolaroids = rawPolaroids.filter((polaroid) => {
    return typeof polaroid === "object" && polaroid !== null
  })

  return (
    <>
      <HeroSection socialLinks={socialLinks} />
      <AboutUsSection reels={resolvedReels} />
      <WhoWeAreSection polaroids={resolvedPolaroids} />
      <ValuesSection />
      <SponsorsServerSection />
    </>
  )
}
