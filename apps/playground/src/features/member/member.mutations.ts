import { ValidationError } from "payload"
import { buildUsername } from "@/features/member/helpers/username"
import type { AuthNames } from "@/features/member/member.queries"
import { Slugs } from "@/lib/payload"
import { getPayloadClient } from "@/lib/payload/getPayloadClient"
import type { Member } from "@/payload/payload-types"

const USERNAME_ATTEMPTS = 5

function duplicateField(err: unknown): string | null {
  if (!(err instanceof ValidationError)) return null
  const duplicate = err.data?.errors?.find((e) => e.message === "Value must be unique")
  return duplicate ? (duplicate.path ?? "") : null
}

/** `null` means another request created it first, so the caller should re-read. */
export async function createMember(
  authServiceID: string,
  names: AuthNames,
): Promise<Member | null> {
  const payload = await getPayloadClient()

  for (let attempt = 0; attempt < USERNAME_ATTEMPTS; attempt++) {
    try {
      return await payload.create({
        collection: Slugs.Collections.MEMBER,
        data: { ...names, authServiceID, username: buildUsername(names.firstName, names.lastName) },
      })
    } catch (err) {
      const field = duplicateField(err)
      if (field === "authServiceID") return null
      if (field !== "username") throw err
    }
  }

  throw new Error(
    `Could not find a free username for member ${authServiceID} in ${USERNAME_ATTEMPTS} attempts`,
  )
}

/**
 * Writes the auth service's names onto the stored copy when they have drifted,
 * and returns the member either way. Does nothing when they already match or
 * when the auth service could not be reached.
 */
export async function syncNames(member: Member, names: AuthNames | null): Promise<Member> {
  if (!names) return member
  if (member.firstName === names.firstName && member.lastName === names.lastName) return member

  const payload = await getPayloadClient()
  return payload.update({
    collection: Slugs.Collections.MEMBER,
    id: member.id,
    data: names,
    // `revalidateTag` throws during render. Safe to skip only because nothing
    // reads under `member:{id}` yet — adding such a reader means moving this
    // name sync out of the render path.
    context: { disableRevalidate: true },
  })
}
