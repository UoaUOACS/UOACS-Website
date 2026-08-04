import type { CollectionConfig } from "payload"
import { Slugs } from "@/lib/payload/slugs"

export const Media: CollectionConfig = {
  slug: Slugs.Collections.MEDIA,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
}
