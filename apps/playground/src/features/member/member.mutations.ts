import { ValidationError } from "payload"
import { buildUsername } from "@/features/member/helpers/username"
import type { AuthNames } from "@/features/member/member.queries"
import { Slugs } from "@/lib/payload"
import { getPayloadClient } from "@/lib/payload/getPayloadClient"
import type { Member } from "@/payload/payload-types"

const USERNAME_ATTEMPTS = 5

/** Matched on the field rather than the message, which Payload translates. */
const isUsernameClash = (err: unknown): boolean =>
  err instanceof ValidationError && err.data?.errors?.some((e) => e.path === "username") === true

/**
 * Throws if the member could not be created, including when another request
 * created one first. The caller re-reads to tell those apart, since the
 * database is a better answer than the error.
 */
export async function createMember(authServiceID: string, names: AuthNames): Promise<Member> {
  const payload = await getPayloadClient()

  for (let attempt = 0; attempt < USERNAME_ATTEMPTS; attempt++) {
    try {
      return await payload.create({
        collection: Slugs.Collections.MEMBER,
        data: { ...names, authServiceID, username: buildUsername(names.firstName, names.lastName) },
      })
    } catch (err) {
      if (!isUsernameClash(err)) throw err
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
