"use server"

import { auth } from "@/lib/auth"
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

export async function checkUserExists(email: string): Promise<boolean> {
  const context = await auth.$context
  const user = await context.internalAdapter.findUserByEmail(email)
  return user !== null && user !== undefined
}
