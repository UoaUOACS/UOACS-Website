import { SponsorsSection } from "@/components/Composite"
import { payload, Slugs } from "@/lib/payload"
import type { Sponsor } from "@/payload/payload-types"

export const SponsorsServerSection = async () => {
  const { docs: sponsors }: { docs: Sponsor[] } = await payload.find({
    collection: Slugs.Collections.SPONSOR,
  })

  return <SponsorsSection sponsors={sponsors} />
}
