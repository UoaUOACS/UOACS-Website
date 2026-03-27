import type { CollectionBeforeOperationHook, CollectionConfig } from "payload"
import { compressVideo } from "@/lib/compression"
import { Slugs } from "@/lib/slugs"

const compressVideoHook: CollectionBeforeOperationHook = async ({ operation, req }) => {
  if (operation !== "create") return
  if (!req.file || !req.file.mimetype?.startsWith("video/")) return

  try {
    const compressed = await compressVideo(req.file.data)
    req.file.data = compressed
    req.file.size = compressed.length
  } catch (err) {
    req.payload.logger.error({ err }, "Video compression failed, uploading original")
  }
}

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
  hooks: {
    beforeOperation: [compressVideoHook],
  },
  upload: true,
}
