import type { CollectionConfig } from "payload"
import { Slugs } from "@/lib/payload/slugs"
import { ImageGrid } from "../blocks/ImageGrid"
import { Text } from "../blocks/Text"

export const Project: CollectionConfig = {
  slug: Slugs.Collections.PROJECT,
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
    },
    {
      name: "author",
      type: "text", // TODO: update to relationship once member collection set up
      required: true,
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: Slugs.Collections.MEDIA,
      required: true,
    },
    // TODO: add link to awards and add link to likes once collections are set up
    {
      name: "pageContent",
      type: "blocks",
      blocks: [Text, ImageGrid],
      required: true,
    },
  ],
}
