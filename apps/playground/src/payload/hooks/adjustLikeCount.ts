import type { MongooseAdapter } from "@payloadcms/db-mongodb"
import type { PayloadRequest } from "payload"
import { Slugs } from "@/lib/payload/slugs"

/**
 * Changes a project's cached like count with an atomic `$inc`
 *
 * This goes around Payload, so concurrent likes cannot overwrite each other and the Project
 * hooks do not run. It joins the request's transaction, so a rolled-back like also rolls back
 * the count.
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
    { _id: projectID },
    { $inc: { likeCount: delta } },
    { session },
  )
}
