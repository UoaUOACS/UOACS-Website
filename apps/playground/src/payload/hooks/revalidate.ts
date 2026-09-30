import { revalidateTag } from "next/cache"
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload"
import type { CacheTag } from "@/lib/cache"

const revalidateTags = (
  tags: CacheTag[],
  payload: { logger: { info: (msg: string) => void } },
): void => {
  for (const tag of tags) {
    payload.logger.info(`Revalidating ${tag}`)
    revalidateTag(tag, "max")
  }
}

export const makeRevalidateHooks = (
  tags: CacheTag[],
): {
  afterChange: CollectionAfterChangeHook
  afterDelete: CollectionAfterDeleteHook
  globalAfterChange: GlobalAfterChangeHook
} => ({
  afterChange: (({ req: { payload } }) => {
    revalidateTags(tags, payload)
  }) satisfies CollectionAfterChangeHook,

  afterDelete: (({ req: { payload } }) => {
    revalidateTags(tags, payload)
  }) satisfies CollectionAfterDeleteHook,

  globalAfterChange: (({ req: { payload } }) => {
    revalidateTags(tags, payload)
  }) satisfies GlobalAfterChangeHook,
})
