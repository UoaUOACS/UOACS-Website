import config from "@payload-config"
import type { Metadata } from "next"
import { getPayload } from "payload"
import { AboutUsSection, HeroSection, ValuesSection, WhoWeAreSection } from "@/components/Composite"
import type { Reel } from "@/payload/payload-types"
import { SponsorsServerSection } from "./_components/SponsorsServerSection"

export const metadata: Metadata = {
  title: "Home - UOACS",
  description: "University of Auckland Computer Society - Join our community of CS students!",
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const homePage = await payload.findGlobal({
    slug: "home-page",
  })

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
      <HeroSection />
      <AboutUsSection reels={resolvedReels} />
      <WhoWeAreSection polaroids={resolvedPolaroids} />
      <ValuesSection />
      <SponsorsServerSection />
    </>
  )
}
