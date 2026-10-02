import type { CollectionConfig } from "payload"
import { CacheTags } from "@/lib/cache"
import { Slugs } from "@/lib/payload/slugs"
import { makeRevalidateHooks } from "../hooks/revalidate"

const { afterChange, afterDelete } = makeRevalidateHooks([CacheTags.MEDIA], { skipCreate: true })

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
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
}
