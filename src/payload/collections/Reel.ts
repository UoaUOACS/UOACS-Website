import type { CollectionConfig } from "payload"

export const Reel: CollectionConfig = {
  slug: "reel",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: "Title of the reel",
      },
    },
    {
      name: "subtitle",
      type: "text",
      required: false,
      admin: {
        description: "Subtitle or description of the reel",
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
}
