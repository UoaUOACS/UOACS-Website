import config from "@payload-config"
import { getPayload, type Payload } from "payload"

let client: Promise<Payload> | undefined

/**
 * Lazy, because this module sits in the auth route's import graph. Initialising
 * at module scope would make `next build` connect to the database, and would
 * leave a rejected module cached for the life of the process, so one blip at
 * cold start would 500 every request until the machine is replaced.
 */
export const getPayloadClient = (): Promise<Payload> => {
  client ??= getPayload({ config }).catch((error) => {
    client = undefined
    throw error
  })
  return client
}
