import config from "@payload-config"
import { getPayload, type Payload } from "payload"

export const payload: Payload = await getPayload({ config })

export { type CollectionSlug, type GlobalSlug, type Slug, Slugs } from "./slugs"
