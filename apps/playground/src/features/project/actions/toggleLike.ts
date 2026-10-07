"use server"

import { updateTag } from "next/cache"
import type { Where } from "payload"
import { z } from "zod"
import { getCurrentMember } from "@/features/member/member.queries"
import { CacheTags } from "@/lib/cache"
import { Slugs } from "@/lib/payload"
import { getPayloadClient } from "@/lib/payload/getPayloadClient"

export type ToggleLikeResult =
  | { ok: true; liked: boolean }
  | { ok: false; error: string; reason?: "unauthenticated" }

// Counts may lag, as the Like hooks refresh them in the background, but the member's own hearts
// must not, so expire only their liked list here
const expireLikedList = (memberID: string) => updateTag(CacheTags.MEMBERS.LIKES(memberID))

const projectIDSchema = z.string().regex(/^[a-f\d]{24}$/i)

export async function toggleLike(projectID: string): Promise<ToggleLikeResult> {
  const parsed = projectIDSchema.safeParse(projectID)
  if (!parsed.success) return { ok: false, error: "Project not found" }
  const id = parsed.data

  try {
    const result = await getCurrentMember()
    if (result.status === "unavailable")
      return { ok: false, error: "Something went wrong. Try again." }
    if (result.status === "unauthenticated")
      return { ok: false, error: "Log in to like projects", reason: "unauthenticated" }
    const { member } = result

    const payload = await getPayloadClient()
    const where: Where = { project: { equals: id }, member: { equals: member.id } }

    const removed = await payload.delete({ collection: Slugs.Collections.LIKE, where, depth: 0 })
    // A bulk delete reports a failed doc here rather than throwing
    if (removed.errors.length > 0) {
      throw new Error(`Failed to delete like: ${removed.errors[0].message}`)
    }
    if (removed.docs.length > 0) {
      expireLikedList(member.id)
      return { ok: true, liked: false }
    }

    const project = await payload.findByID({
      collection: Slugs.Collections.PROJECT,
      id,
      select: {},
      depth: 0,
      disableErrors: true,
    })
    if (!project) return { ok: false, error: "Project not found" }

    try {
      await payload.create({
        collection: Slugs.Collections.LIKE,
        data: { project: id, member: member.id },
        depth: 0,
      })
    } catch (err) {
      // A concurrent request may have liked it first, so the unique index refuses this one
      const { totalDocs } = await payload.count({ collection: Slugs.Collections.LIKE, where })
      if (totalDocs === 0) throw err
    }

    expireLikedList(member.id)
    return { ok: true, liked: true }
  } catch (err) {
    console.error("[toggleLike] failed to toggle like", { error: err, projectID: id })
    return { ok: false, error: "Something went wrong. Try again." }
  }
}
