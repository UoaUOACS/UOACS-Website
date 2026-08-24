import { revalidatePath } from "next/cache"
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload"
import type { Route } from "@/lib/routes"

const revalidateRoutes = (
  routes: Route[],
  payload: { logger: { info: (msg: string) => void } },
): void => {
  for (const route of routes) {
    payload.logger.info(`Revalidating ${route}`)
    revalidatePath(route)
  }
}

export const makeRevalidateHooks = (
  routes: Route[],
): {
  afterChange: CollectionAfterChangeHook
  afterDelete: CollectionAfterDeleteHook
  globalAfterChange: GlobalAfterChangeHook
} => ({
  afterChange: (({ req: { payload } }) => {
    revalidateRoutes(routes, payload)
  }) satisfies CollectionAfterChangeHook,

  afterDelete: (({ req: { payload } }) => {
    revalidateRoutes(routes, payload)
  }) satisfies CollectionAfterDeleteHook,

  globalAfterChange: (({ req: { payload } }) => {
    revalidateRoutes(routes, payload)
  }) satisfies GlobalAfterChangeHook,
})
