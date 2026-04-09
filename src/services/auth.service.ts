import type { User } from "better-auth"
import { isAPIError } from "better-auth/api"
import { ValidationError } from "payload"
import { auth } from "@/lib/auth"
import { payload } from "@/lib/payload"
import { Slugs } from "@/lib/slugs"
import type { Member } from "@/payload/payload-types"
import { type CreateMemberInput, createMemberSchema } from "@/types/schemas/member"
import { type CreateUserInput, createUserSchema } from "@/types/schemas/user"

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
      throw err
    }
  }

  public async signUpBetterAuth(data: CreateUserInput): Promise<User> {
    const signUpData = createUserSchema.parse(data)
    try {
      const result = await auth.api.signUpEmail({
        body: signUpData,
      })
      return result.user
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
      await context.internalAdapter.deleteUser(userId)
    } catch (err) {
      console.error(
        "[AuthService] CRITICAL: Failed to rollback Better Auth user. Record leaked and requires manual cleanup.",
        { betterAuthUserId: userId, error: err },
      )
    }
  }

  public async linkExistingMember(email: string, betterAuthUserId: string): Promise<Member> {
    try {
      const existing = await payload.find({
        collection: Slugs.Collections.MEMBER,
        where: { email: { equals: email }, betterAuthUserId: { exists: false } },
        limit: 1,
      })

      if (existing.docs.length === 0) {
        await this.rollbackBetterAuthSignUp(betterAuthUserId)
        throw new DuplicateFieldError("email")
      }

      const result = await payload.update({
        collection: Slugs.Collections.MEMBER,
        where: { email: { equals: email } },
        data: { betterAuthUserId },
      })
      return result.docs[0]
    } catch (err) {
      if (!(err instanceof DuplicateFieldError)) {
        await this.rollbackBetterAuthSignUp(betterAuthUserId)
      }
      throw err
    }
  }
}
