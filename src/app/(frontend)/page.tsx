import type { Metadata } from "next"
import { getPayload } from "payload"
import { WhoWeAreSection } from "@/components/Composite"
import config from "@/payload.config"
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

  const rawPolaroids = homePage?.polaroids || []
  const resolvedPolaroids = rawPolaroids.filter((polaroid) => {
    return typeof polaroid === "object" && polaroid !== null
  })

  return (
    <>
      <WhoWeAreSection polaroids={resolvedPolaroids} />
      <SponsorsServerSection />
    </>
  )
}
