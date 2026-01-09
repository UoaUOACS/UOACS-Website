import { getPayload } from "payload"
import { SponsorsSection } from "@/components/Composite"
import type { Sponsor } from "@/payload/payload-types"
import config from "@/payload.config"

export const SponsorsServerSection = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: sponsors }: { docs: Sponsor[] } = await payload.find({
    collection: "sponsor",
  })

  return <SponsorsSection sponsors={sponsors} />
}
