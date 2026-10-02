import type { MongooseAdapter } from "@payloadcms/db-mongodb"
import type { PayloadRequest } from "payload"
import { Slugs } from "@/lib/payload/slugs"

/**
 * Changes a project's cached like count with an atomic `$inc`
 *
 * This goes around Payload, so concurrent likes cannot overwrite each other and the Project
 * hooks do not run. It joins the request's transaction, so a rolled-back like also rolls back
 * the count.
 *
 * Payload validation does not run here, so the decrement filter keeps the count at 0 or more.
 */
export const adjustLikeCount = async (
  req: PayloadRequest,
  projectID: string,
  delta: 1 | -1,
): Promise<void> => {
  const db = req.payload.db as MongooseAdapter
  const transactionID = await req.transactionID
  const session = transactionID ? db.sessions[transactionID] : undefined

  await db.collections[Slugs.Collections.PROJECT].updateOne(
    delta === -1 ? { _id: projectID, likeCount: { $gt: 0 } } : { _id: projectID },
    { $inc: { likeCount: delta } },
    { session },
  )
}
