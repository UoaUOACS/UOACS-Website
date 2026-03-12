import type { CollectionConfig } from "payload"
import { Routes } from "@/lib/routes"
import { SponsorTier } from "@/types/enums"
import { makeRevalidateHooks } from "../hooks/revalidate"

const { afterChange, afterDelete } = makeRevalidateHooks([Routes.SPONSORS, Routes.HOME])

export const Sponsor: CollectionConfig = {
  slug: "sponsor",
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
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
}
