import config from "@payload-config"
import Image from "next/image"
import { getPayload } from "payload"
import { AboutUsSection, HeroSection } from "@/components/Composite"
import type { Reel } from "@/payload/payload-types"
import { SponsorsServerSection } from "./_components/SponsorsServerSection"

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

  return (
    <>
      <Image
        alt="Background Gradient"
        aria-hidden="true"
        className="-z-1 pointer-events-none absolute top-0 left-0 w-full md:w-7/10"
        height={1000}
        src="/home-gradient.svg"
        width={1000}
      />
      <HeroSection />
      <AboutUsSection reels={resolvedReels} />
      <SponsorsServerSection />
    </>
  )
}
