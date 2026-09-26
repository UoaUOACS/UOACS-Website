import type { Block } from "payload"
import { Slugs } from "@/lib/payload/slugs"

export const Text: Block = {
  slug: Slugs.Blocks.TEXT,
  fields: [
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
}
