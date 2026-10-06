import { AuthApiRoutes } from "@uoacs/shared"
import { getSession, sessionFetch } from "@uoacs/shared/auth/server"
import { headers } from "next/headers"
import { unstable_rethrow } from "next/navigation"
import { ValidationError } from "payload"
import { cache } from "react"
import { z } from "zod"
import { buildUsername } from "@/features/member/helpers/username"
import { Slugs } from "@/lib/payload"
import { getPayloadClient } from "@/lib/payload/getPayloadClient"
import type { Member } from "@/payload/payload-types"

/** Mirrors `SessionResult`: `unavailable` is not "logged out". */
export type CurrentMemberResult =
  | { status: "authenticated"; member: Member }
  | { status: "unauthenticated" }
  | { status: "unavailable" }

/**
 * Only the two fields used. The auth service stores `gender` as free text while
 * the shared schema narrows it to four values, so parsing the whole member
 * would reject a valid one over a field the playground never reads.
 */
const authNamesSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})

type AuthNames = z.infer<typeof authNamesSchema>

const USERNAME_ATTEMPTS = 5

function duplicateField(err: unknown): string | null {
  if (!(err instanceof ValidationError)) return null
  const duplicate = err.data?.errors?.find((e) => e.message === "Value must be unique")
  return duplicate ? (duplicate.path ?? "") : null
}

/**
 * The session carries only the email, so names come from the auth service.
 * `null` means "could not find out", never "has no name", so callers fall back
 * to the stored copy rather than locking everyone out.
 */
async function fetchAuthNames(): Promise<AuthNames | null> {
  let body: unknown
  try {
    const response = await sessionFetch(AuthApiRoutes.MEMBER_ME, await headers(), {
      signal: AbortSignal.timeout(5000),
    })
    // Signed in with no member behind the account: a stuck account rather than
    // an outage, so it is not logged as one.
    if (response.status === 404) {
      console.warn("[getCurrentMember] Signed in but the auth service has no member")
      return null
    }
    if (!response.ok) {
      console.error("[getCurrentMember] Auth service answered with an error", {
        status: response.status,
      })
      return null
    }
    body = await response.json()
  } catch (err) {
    unstable_rethrow(err)
    console.error("[getCurrentMember] Failed to reach the auth service", { error: err })
    return null
  }

  const parsed = authNamesSchema.safeParse(body)
  if (!parsed.success) {
    console.error("[getCurrentMember] Auth service returned something without a name", {
      issues: parsed.error.issues.map((issue) => issue.path.join(".")),
    })
    return null
  }
  return parsed.data
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

async function withCurrentNames(member: Member, names: AuthNames | null): Promise<Member> {
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

/**
 * The playground member for whoever is signed in, created on their first visit
 * so every logged-in person has a profile without signing up a second time.
 * Deduplicated per request, as a page may read it in more than one place.
 */
export const getCurrentMember = cache(async (): Promise<CurrentMemberResult> => {
  const session = await getSession()
  if (session.status !== "authenticated") return session

  const authServiceID = session.session.user.id
  // The names are only a refresh, so a failing auth service must not keep
  // someone out of a member we already have.
  const [existing, names] = await Promise.all([
    findByAuthServiceID(authServiceID),
    fetchAuthNames(),
  ])

  if (existing) return { status: "authenticated", member: await withCurrentNames(existing, names) }

  // Creating one is the only step that cannot proceed without a name.
  if (!names) return { status: "unavailable" }

  const created = await createMember(authServiceID, names)
  if (created) return { status: "authenticated", member: created }

  // Lost a race with another request for the same person; theirs is the member.
  const raced = await findByAuthServiceID(authServiceID)
  if (!raced) throw new Error(`Member ${authServiceID} was created and then vanished`)
  return { status: "authenticated", member: raced }
})
