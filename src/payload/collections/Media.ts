import type { CollectionConfig } from "payload"
import { Slugs } from "@/lib/slugs"

export const Media: CollectionConfig = {
  slug: Slugs.Collections.media,
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
