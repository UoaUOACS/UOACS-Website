"use server"

import { payload } from "@/lib/payload"
import { Slugs } from "@/lib/slugs"

export async function checkMemberExists(email: string): Promise<boolean> {
  const result = await payload.find({
    collection: Slugs.Collections.MEMBER,
    where: { email: { equals: email }, betterAuthUserId: { equals: null } },
    limit: 1,
  })
  return result.docs.length > 0
}
