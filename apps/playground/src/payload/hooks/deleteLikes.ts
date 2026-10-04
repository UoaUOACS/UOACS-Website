import type { CollectionBeforeDeleteHook } from "payload"
import { Slugs } from "@/lib/payload/slugs"

/**
 * Builds a hook that deletes the likes of a project or member before the document is deleted
 *
 * The Like hooks run for each deleted like, so the project like counts stay correct. A like
 * that cannot be deleted stops the delete of the parent document.
 */
export const makeDeleteLikesHook =
  (field: "project" | "member"): CollectionBeforeDeleteHook =>
  async ({ id, req }) => {
    const { errors } = await req.payload.delete({
      collection: Slugs.Collections.LIKE,
      where: { [field]: { equals: id } },
      depth: 0,
      req,
    })

    if (errors.length > 0) {
      throw new Error(`Failed to delete ${errors.length} like(s) of ${field} ${id}`)
    }
  }
