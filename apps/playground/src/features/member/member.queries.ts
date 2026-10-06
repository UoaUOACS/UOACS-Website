import { AuthApiRoutes, memberResponseSchema } from "@uoacs/shared"
import { getSession, sessionFetch } from "@uoacs/shared/auth/server"
import { headers } from "next/headers"
import { ValidationError } from "payload"
import { cache } from "react"
import { buildUsername } from "@/features/member/helpers/username"
import { Slugs } from "@/lib/payload"
import { getPayloadClient } from "@/lib/payload/getPayloadClient"
import type { Member } from "@/payload/payload-types"

/**
 * Mirrors `SessionResult`, because `unavailable` is not "logged out". Telling
 * the two apart is the whole point of the shared `getSession`, so collapsing
 * them to `null` here would undo it.
 */
export type CurrentMemberResult =
  | { status: "authenticated"; member: Member }
  | { status: "unauthenticated" }
  | { status: "unavailable" }

type AuthNames = { firstName: string; lastName: string }

/** How many usernames to try before giving up; each ends in 10 random digits. */
const USERNAME_ATTEMPTS = 5

function duplicateField(err: unknown): string | null {
  if (!(err instanceof ValidationError)) return null
  const duplicate = err.data?.errors?.find((e) => e.message === "Value must be unique")
  return duplicate ? (duplicate.path ?? "") : null
}

/** The session carries only the email, so names come from the auth service. */
async function fetchAuthNames(): Promise<AuthNames | null> {
  let body: unknown
  try {
    const response = await sessionFetch(AuthApiRoutes.MEMBER_ME, await headers())
    if (!response.ok) {
      console.error("[getCurrentMember] Auth service answered with an error", {
        status: response.status,
      })
      return null
    }
    body = await response.json()
  } catch (err) {
    console.error("[getCurrentMember] Failed to reach the auth service", { error: err })
    return null
  }

  const parsed = memberResponseSchema.safeParse(body)
  if (!parsed.success) {
    console.error("[getCurrentMember] Auth service returned something that is not a member", {
      issues: parsed.error.issues.map((issue) => issue.path.join(".")),
    })
    return null
  }
  return { firstName: parsed.data.firstName, lastName: parsed.data.lastName }
}

async function findByAuthServiceID(authServiceID: string): Promise<Member | null> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: Slugs.Collections.MEMBER,
    where: { authServiceID: { equals: authServiceID } },
    limit: 1,
  })
  return docs[0] ?? null
}

/** `null` means another request created it first, so the caller should re-read. */
async function createMember(authServiceID: string, names: AuthNames): Promise<Member | null> {
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

async function withCurrentNames(member: Member, names: AuthNames): Promise<Member> {
  if (member.firstName === names.firstName && member.lastName === names.lastName) return member

  const payload = await getPayloadClient()
  return payload.update({
    collection: Slugs.Collections.MEMBER,
    id: member.id,
    data: names,
  })
}

/**
 * The playground member for whoever is signed in, created on their first visit
 * so every logged-in person has a profile without signing up a second time.
 *
 * Cached per request, since a page may ask for it in several places.
 */
export const getCurrentMember = cache(async (): Promise<CurrentMemberResult> => {
  const session = await getSession()
  if (session.status !== "authenticated") return session

  const authServiceID = session.session.user.id
  const names = await fetchAuthNames()
  if (!names) return { status: "unavailable" }

  const existing = await findByAuthServiceID(authServiceID)
  if (existing) {
    return { status: "authenticated", member: await withCurrentNames(existing, names) }
  }

  const created = await createMember(authServiceID, names)
  if (created) return { status: "authenticated", member: created }

  // Lost a race with another request for the same person; theirs is the member.
  const raced = await findByAuthServiceID(authServiceID)
  if (!raced) throw new Error(`Member ${authServiceID} was created and then vanished`)
  return { status: "authenticated", member: raced }
})
