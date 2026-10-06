"use server"

import { getCurrentMember } from "@/features/member/member.queries"
import { editMemberSchema } from "@/features/member/schemas/editMember.schema"
import { Slugs } from "@/lib/payload"
import { getPayloadClient } from "@/lib/payload/getPayloadClient"
import type { Member } from "@/payload/payload-types"

export type EditMemberResult =
  | { ok: true; member: Member }
  | { ok: false; error: "invalid" | "unauthenticated" | "unavailable" | "server" }

/**
 * Updates the signed-in person's own profile. The form sends the whole view,
 * so omitted `skills` and `links` clear them rather than being left alone.
 *
 * Anyone can call a server action with anything, so the member being edited
 * comes from the session rather than from the caller — a member id in the
 * input would let someone edit a profile that is not theirs. The collection
 * keeps Payload's admin-only create and update for the same reason, which is
 * why the write below bypasses access control: this function is the check.
 */
export async function editMember(input: unknown): Promise<EditMemberResult> {
  const parsed = editMemberSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "invalid" }

  const current = await getCurrentMember()
  if (current.status !== "authenticated") return { ok: false, error: current.status }

  try {
    const payload = await getPayloadClient()
    const member = await payload.update({
      collection: Slugs.Collections.MEMBER,
      id: current.member.id,
      data: parsed.data,
      overrideAccess: true,
    })
    return { ok: true, member }
  } catch (error) {
    console.error("[editMember] Failed to update the member", { error })
    return { ok: false, error: "server" }
  }
}
