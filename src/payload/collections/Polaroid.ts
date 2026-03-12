import type { CollectionConfig } from "payload"
import { Routes } from "@/lib/routes"
import { Slugs } from "@/lib/slugs"
import { makeRevalidateHooks } from "../hooks/revalidate"

const { afterChange, afterDelete } = makeRevalidateHooks([Routes.HOME])

export const Polaroid: CollectionConfig = {
  slug: Slugs.Collections.POLAROID,
  admin: {
    useAsTitle: "caption",
  },
  fields: [
    {
      name: "caption",
      type: "text",
      required: true,
      admin: {
        description: "Caption underneath the polaroid image",
      },
    },
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
      required: true,
      admin: {
        description: "The image file for the polaroid",
      },
    },
  ],
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
}
