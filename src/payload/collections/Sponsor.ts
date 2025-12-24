import type { CollectionConfig } from "payload"
import { SponsorTier } from "@/types/enums"

export const Sponsor: CollectionConfig = {
  slug: "sponsor",
  access: {
    read: () => true,
  },
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
      relationTo: "media",
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
}
