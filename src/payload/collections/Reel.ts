import type { CollectionConfig } from "payload"

export const Reel: CollectionConfig = {
  slug: "reel",
  access: {
    read: () => true,
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
}
