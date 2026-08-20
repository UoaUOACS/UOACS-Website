import crypto from "node:crypto"
import type { User } from "better-auth"
import { isAPIError } from "better-auth/api"
import { ValidationError } from "payload"
import { auth } from "@/lib/auth/auth"
import { payload } from "@/lib/payload"
import { Slugs } from "@/lib/payload/slugs"
import type { Member } from "@/payload/payload-types"
import {
  type CreateMemberInput,
  createMemberSchema,
  type UpdateMemberInput,
} from "@/types/schemas/member"
import type { CreateUserInput } from "@/types/schemas/user"

export class DuplicateFieldError extends Error {
  constructor(public readonly field: string) {
    super("Value already in use")
    this.name = "DuplicateFieldError"
  }
}

export class BetterAuthSignUpError extends Error {
  constructor(cause?: unknown) {
    super("Better Auth sign up failed")
    this.name = "BetterAuthSignUpError"
    if (cause !== undefined) this.cause = cause
  }
}

export class AuthService {
  public async signUpPayloadMember(
    data: CreateMemberInput,
    betterAuthUserId: string,
  ): Promise<Member> {
    const memberData = createMemberSchema.parse(data)

    try {
      return await payload.create({
        collection: Slugs.Collections.MEMBER,
        data: { ...memberData, betterAuthUserId },
      })
    } catch (err) {
      await this.rollbackBetterAuthSignUp(betterAuthUserId)
      if (
        err instanceof ValidationError &&
        err.data?.errors?.some((e) => e.message === "Value must be unique")
      ) {
        const field = err.data.errors.find((e) => e.message === "Value must be unique")?.path ?? ""
        throw new DuplicateFieldError(field)
      }
      console.error("[AuthService] signUpPayloadMember failed, Better Auth user rolled back", {
        betterAuthUserId,
        error: err,
      })
      throw err
    }
  }

  public async signUpBetterAuth(data: CreateUserInput): Promise<{ user: User; headers: Headers }> {
    try {
      const { response, headers } = await auth.api.signUpEmail({
        body: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          password: data.password,
        },
        returnHeaders: true,
      })
      return { user: response.user, headers }
    } catch (err) {
      if (isAPIError(err) && err.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
        throw new DuplicateFieldError("email")
      }
      console.error("[AuthService] signUpBetterAuth unexpected error", {
        email: data.email,
        error: err,
      })
      throw new BetterAuthSignUpError(err)
    }
  }

  public async rollbackBetterAuthSignUp(userId: string): Promise<void> {
    try {
      const context = await auth.$context
      await context.internalAdapter.deleteAccounts(userId)
      await context.internalAdapter.deleteUser(userId)
    } catch (err) {
      console.error(
        "[AuthService] CRITICAL: Failed to rollback Better Auth user. Record leaked and requires manual cleanup.",
        { betterAuthUserId: userId, error: err },
      )
    }
  }

  public async linkExistingMember(email: string, betterAuthUserId: string): Promise<Member> {
    let alreadyRolledBack = false

    try {
      const existing = await payload.find({
        collection: Slugs.Collections.MEMBER,
        where: { email: { equals: email }, betterAuthUserId: { equals: null } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        alreadyRolledBack = true
        await this.rollbackBetterAuthSignUp(betterAuthUserId)
        throw new DuplicateFieldError("email")
      }

      const existingDoc = existing.docs[0]
      const result = await payload.db.updateOne({
        collection: Slugs.Collections.MEMBER,
        id: existingDoc.id,
        data: { betterAuthUserId },
      })

      if (!result) {
        alreadyRolledBack = true
        await this.rollbackBetterAuthSignUp(betterAuthUserId)
        throw new DuplicateFieldError("email")
      }

      return { ...existingDoc, betterAuthUserId }
    } catch (err) {
      if (!alreadyRolledBack) {
        console.error("[AuthService] linkExistingMember failed, rolling back Better Auth user", {
          email,
          betterAuthUserId,
          error: err,
        })
        await this.rollbackBetterAuthSignUp(betterAuthUserId)
      }
      throw err
    }
  }

  public async updateMember(memberId: string, data: UpdateMemberInput): Promise<Member> {
    try {
      return await payload.update({
        collection: Slugs.Collections.MEMBER,
        id: memberId,
        data,
      })
    } catch (err) {
      if (
        err instanceof ValidationError &&
        err.data?.errors?.some((e) => e.message === "Value must be unique")
      ) {
        const field = err.data.errors.find((e) => e.message === "Value must be unique")?.path ?? ""
        throw new DuplicateFieldError(field)
      }
      console.error("[AuthService] updateMember failed", { memberId, error: err })
      throw err
    }
  }

  public async updateAuthUser(
    data: UpdateMemberInput,
    currentMember: Member,
    headers: Headers,
  ): Promise<void> {
    const { firstName, lastName } = data
    if (firstName !== undefined || lastName !== undefined) {
      await auth.api.updateUser({
        headers,
        body: {
          name: `${firstName ?? currentMember.firstName} ${lastName ?? currentMember.lastName}`,
        },
      })
    }
  }

  public async getMemberFromUser(user: User): Promise<Member | null> {
    const res = await payload.find({
      collection: Slugs.Collections.MEMBER,
      where: {
        betterAuthUserId: { equals: user.id }, // "betterAuthUserId" is a field entry from @/payload/collections/Member.ts
      },
      limit: 1,
    })

    return res.docs[0] ?? null
  }

  public async checkMemberExists(email: string): Promise<boolean> {
    const result = await payload.find({
      collection: Slugs.Collections.MEMBER,
      where: { email: { equals: email }, betterAuthUserId: { equals: null } },
      limit: 1,
    })
    return result.docs.length > 0
  }

  public generateVerificationCode(): string {
    return crypto.randomInt(100000, 1000000).toString()
  }

  public async createVerificationCode(email: string, code: string): Promise<string> {
    await payload.delete({
      collection: Slugs.Collections.EMAIL_VERIFICATION_CODE,
      where: { email: { equals: email } },
    })

    const hashedCode = this.hashVerificationCode(code)

    await payload.create({
      collection: Slugs.Collections.EMAIL_VERIFICATION_CODE,
      data: {
        email: email,
        hashedCode: hashedCode,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // expires in 10 minutes
      },
    })

    return code
  }

  private hashVerificationCode(code: string): string {
    return crypto.createHash("sha256").update(code).digest("hex")
  }

  public verifyVerificationCode(code: string, hash: string): boolean {
    const codeHash = Buffer.from(this.hashVerificationCode(code), "hex")
    const hashBuffer = Buffer.from(hash, "hex")
    if (codeHash.length !== hashBuffer.length) {
      return false
    }
    return crypto.timingSafeEqual(codeHash, hashBuffer)
  }

  public async getUnexpiredVerificationCodes(
    email: string,
  ): Promise<Array<{ id: string; hashedCode: string; expiresAt: string }>> {
    const result = await payload.find({
      collection: Slugs.Collections.EMAIL_VERIFICATION_CODE,
      where: {
        email: { equals: email },
        expiresAt: { greater_than: new Date().toISOString() },
      },
      limit: 100,
    })

    return result.docs.map((doc) => ({
      id: doc.id,
      hashedCode: doc.hashedCode,
      expiresAt: doc.expiresAt,
    }))
  }

  public async deleteVerificationCodes(email: string): Promise<void> {
    await payload.delete({
      collection: Slugs.Collections.EMAIL_VERIFICATION_CODE,
      where: { email: { equals: email } },
    })
  }
}
