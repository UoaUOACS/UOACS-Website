import config from "@payload-config"
import { getPayload } from "payload"
import { AboutUsSection } from "@/components/Composite"
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
      <AboutUsSection reels={resolvedReels} />
      <SponsorsServerSection />
    </>
  )
}
