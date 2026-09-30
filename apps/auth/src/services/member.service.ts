import { AuthCollectionSlugs } from "@uoacs/shared"
import type { CreateMemberInput, Member, UpdateMemberInput } from "@uoacs/shared/payload"
import type { User } from "better-auth"
import { ValidationError } from "payload"
import { auth } from "@/lib/auth/auth"
import { getPayloadClient } from "@/lib/payload"

export class DuplicateFieldError extends Error {
  constructor(public readonly field: string) {
    super("Value already in use")
    this.name = "DuplicateFieldError"
  }
}

function duplicateField(err: unknown): string | null {
  if (!(err instanceof ValidationError)) return null
  const duplicate = err.data?.errors?.find((e) => e.message === "Value must be unique")
  return duplicate ? (duplicate.path ?? "") : null
}

export class MemberService {
  public async findByUserId(userId: string): Promise<Member | null> {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: AuthCollectionSlugs.MEMBER,
      where: { betterAuthUserId: { equals: userId } },
      limit: 1,
    })
    return res.docs[0] ?? null
  }

  public async findById(id: string): Promise<Member | null> {
    const payload = await getPayloadClient()
    try {
      return await payload.findByID({ collection: AuthCollectionSlugs.MEMBER, id })
    } catch {
      return null
    }
  }

  /** A member row with no linked account: signed up before Better Auth existed. */
  public async hasUnlinkedMember(email: string): Promise<boolean> {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: AuthCollectionSlugs.MEMBER,
      where: { email: { equals: email }, betterAuthUserId: { equals: null } },
      limit: 1,
    })
    return res.docs.length > 0
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: AuthCollectionSlugs.MEMBER,
      where: { email: { equals: email } },
      limit: 1,
    })
    return res.docs.length > 0
  }

  public async create(data: CreateMemberInput, betterAuthUserId: string): Promise<Member> {
    const payload = await getPayloadClient()
    try {
      return await payload.create({
        collection: AuthCollectionSlugs.MEMBER,
        data: { ...data, betterAuthUserId },
      })
    } catch (err) {
      const field = duplicateField(err)
      if (field !== null) throw new DuplicateFieldError(field)
      throw err
    }
  }

  /** Claims a pre-Better-Auth member row for a newly created account. */
  public async link(email: string, betterAuthUserId: string): Promise<Member> {
    const payload = await getPayloadClient()
    const existing = await payload.find({
      collection: AuthCollectionSlugs.MEMBER,
      where: { email: { equals: email }, betterAuthUserId: { equals: null } },
      limit: 1,
    })

    const doc = existing.docs[0]
    if (!doc) throw new DuplicateFieldError("email")

    const updated = await payload.db.updateOne({
      collection: AuthCollectionSlugs.MEMBER,
      id: doc.id,
      data: { betterAuthUserId },
    })
    if (!updated) throw new DuplicateFieldError("email")

    return { ...doc, betterAuthUserId }
  }

  public async update(id: string, data: UpdateMemberInput): Promise<Member> {
    const payload = await getPayloadClient()
    try {
      return await payload.update({ collection: AuthCollectionSlugs.MEMBER, id, data })
    } catch (err) {
      const field = duplicateField(err)
      if (field !== null) throw new DuplicateFieldError(field)
      throw err
    }
  }

  public async updateAccountName(
    data: UpdateMemberInput,
    current: Member,
    headers: Headers,
  ): Promise<void> {
    const { firstName, lastName } = data
    if (firstName === undefined && lastName === undefined) return

    await auth.api.updateUser({
      headers,
      body: { name: `${firstName ?? current.firstName} ${lastName ?? current.lastName}` },
    })
  }

  /**
   * Removes the member row and the account behind it. Order matters: a failure
   * after the row is gone would leave an account that can log in but resolves
   * to no member.
   */
  public async deleteWithAccount(id: string, betterAuthUserId?: string | null): Promise<void> {
    if (betterAuthUserId) await this.deleteAccount(betterAuthUserId)

    const payload = await getPayloadClient()
    await payload.delete({ collection: AuthCollectionSlugs.MEMBER, id })
  }

  public async deleteAccount(userId: string): Promise<void> {
    const context = await auth.$context
    await context.internalAdapter.deleteAccounts(userId)
    await context.internalAdapter.deleteUser(userId)
  }

  public async signUp(data: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<{ user: User; headers: Headers }> {
    const { response, headers } = await auth.api.signUpEmail({
      body: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      },
      returnHeaders: true,
    })
    return { user: response.user, headers }
  }
}
