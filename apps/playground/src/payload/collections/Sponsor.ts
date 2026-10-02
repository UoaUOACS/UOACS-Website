import type { CollectionConfig } from "payload"
import { SponsorTier } from "@/features/sponsor/types/enums"
import { CacheTags } from "@/lib/cache"
import { Slugs } from "@/lib/payload/slugs"
import { makeRevalidateHooks } from "../hooks/revalidate"

const { afterChange, afterDelete } = makeRevalidateHooks([CacheTags.SPONSORS])

export const Sponsor: CollectionConfig = {
  slug: Slugs.Collections.SPONSOR,
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Sponsor name, e.g. 'Jane Street'",
      },
    },
    {
      name: "link",
      type: "text",
      required: true,
      admin: {
        description: "Link to visit the Sponsor, e.g. 'https://www.aleckshen.com/'",
      },
    },
    {
      name: "logo",
      type: "relationship",
      relationTo: Slugs.Collections.MEDIA,
      required: true,
      admin: {
        description: "Sponsor logo to be displayed",
      },
    },
    {
      name: "tier",
      type: "select",
      options: Object.values(SponsorTier),
      required: true,
      admin: {
        description: "Sponsor's current tier (diamond, gold, or silver)",
      },
    },
  ],
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
}
