import { cacheLife, cacheTag } from "next/cache"
import type { CurrentMemberResult } from "@/features/member/member.types"
import { CacheTags } from "@/lib/cache"
import { Slugs } from "@/lib/payload"
import { getPayloadClient } from "@/lib/payload/getPayloadClient"
import { getRelationID } from "@/lib/payload/getRelationID"

/**
 * Returns which of the given projects the signed-in member has liked, or none when signed out
 *
 * Only the given projects are checked, so the query stays small however many likes the member has.
 */
export const getLikedProjectIDs = async (
  member: CurrentMemberResult,
  projectIDs: string[],
): Promise<string[]> => {
  if (member.status !== "authenticated" || projectIDs.length === 0) return []

  return getLikedProjectIDsForMemberCached(member.member.id, projectIDs)
}

export const getLikedProjectIDsForMember = async (
  memberID: string,
  projectIDs: string[],
): Promise<string[]> => {
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: Slugs.Collections.LIKE,
    where: { member: { equals: memberID }, project: { in: projectIDs } },
    select: { project: true },
    depth: 0,
    pagination: false,
  })
  return docs.map((like) => getRelationID(like.project))
}

// Takes the member ID as an argument because a cached function cannot read the request cookies
export const getLikedProjectIDsForMemberCached = async (
  memberID: string,
  projectIDs: string[],
): Promise<string[]> => {
  "use cache"
  cacheTag(CacheTags.MEMBERS.LIKES(memberID))
  cacheLife("max")

  return getLikedProjectIDsForMember(memberID, projectIDs)
}
