import type { CollectionConfig } from "payload"
import { Routes } from "@/lib/routes"
import { makeRevalidateHooks } from "../hooks/revalidate"

const { afterChange, afterDelete } = makeRevalidateHooks([Routes.home])

export const Reel: CollectionConfig = {
  slug: "reel",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "description",
  },
  fields: [
    {
      name: "description",
      type: "text",
      required: true,
      admin: {
        description: "Description of the reel",
      },
    },
    {
      name: "video",
      type: "relationship",
      relationTo: "media",
      required: true,
      admin: {
        description: "The video file for the reel",
      },
    },
  ],
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
}
