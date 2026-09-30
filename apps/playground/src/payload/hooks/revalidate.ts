import { revalidateTag } from "next/cache"
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from "payload"
import type { CacheTag } from "@/lib/cache"

/**
 * Revalidates each tag without failing the write that triggered it
 *
 * `revalidateTag` throws outside a Next.js request (e.g. seed scripts or the Payload CLI).
 * Pass `context: { disableRevalidate: true }` to the Local API call to skip revalidation there.
 */
const revalidateTags = (tags: CacheTag[], req: PayloadRequest, source: string): void => {
  if (req.context.disableRevalidate) return

  for (const tag of tags) {
    try {
      revalidateTag(tag, "max")
      req.payload.logger.info(`Revalidated cache tag "${tag}" after ${source}`)
    } catch (err) {
      req.payload.logger.error({ err, source, tag }, `Failed to revalidate cache tag "${tag}"`)
    }
  }
}

export const makeRevalidateHooks = (
  tags: CacheTag[],
): {
  afterChange: CollectionAfterChangeHook
  afterDelete: CollectionAfterDeleteHook
  globalAfterChange: GlobalAfterChangeHook
} => ({
  afterChange: (({ collection, doc, req }) => {
    revalidateTags(tags, req, `${collection.slug} ${doc.id} change`)
  }) satisfies CollectionAfterChangeHook,

  afterDelete: (({ collection, id, req }) => {
    revalidateTags(tags, req, `${collection.slug} ${id} delete`)
  }) satisfies CollectionAfterDeleteHook,

  globalAfterChange: (({ global, req }) => {
    revalidateTags(tags, req, `${global.slug} change`)
  }) satisfies GlobalAfterChangeHook,
})
