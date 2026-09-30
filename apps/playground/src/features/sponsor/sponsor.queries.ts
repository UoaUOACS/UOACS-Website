import { cacheLife, cacheTag } from "next/cache"
import { CacheTags } from "@/lib/cache"
import { Slugs } from "@/lib/payload"
import { getPayloadClient } from "@/lib/payload/getPayloadClient"

export const getAllSponsorsCached = async () => {
  "use cache"
  cacheTag(CacheTags.SPONSORS)
  cacheLife("max")

  return getAllSponsors()
}

export const getAllSponsors = async () => {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: Slugs.Collections.SPONSOR,
    pagination: false,
  })
  return docs
}
