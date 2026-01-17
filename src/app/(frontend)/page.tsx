import config from "@payload-config"
import type { Metadata } from "next"
import Image from "next/image"
import { getPayload } from "payload"
import { AboutUsSection, HeroSection, WhoWeAreSection } from "@/components/Composite"
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
      <Image
        alt="Background Gradient"
        aria-hidden="true"
        className="-z-1 pointer-events-none absolute top-0 left-0 hidden w-full md:block md:w-7/10"
        height={1000}
        src="/home-gradient.svg"
        width={1000}
      />
      <HeroSection />
      <AboutUsSection reels={resolvedReels} />
      <WhoWeAreSection polaroids={resolvedPolaroids} />
      <SponsorsServerSection />
    </>
  )
}
