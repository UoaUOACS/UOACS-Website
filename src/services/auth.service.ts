import type { User } from "better-auth"
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
  constructor() {
    super("Better Auth sign up failed")
    this.name = "BetterAuthSignUpError"
  }
}

export class AuthService {
  public async signUpPayloadMember(data: Response["json"]): Promise<Member> {
    const memberData = createMemberSchema.parse(data)

    try {
      return await payload.create({
        collection: Slugs.Collections.MEMBER,
        data: memberData,
      })
    } catch (err) {
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
    } catch {
      throw new BetterAuthSignUpError()
    }
  }

  public async rollbackBetterAuthSignUp(userId: string): Promise<void> {
    const context = await auth.$context
    await context.internalAdapter.deleteUser(userId)
  }

  public async linkExistingMember(email: string, betterAuthUserId: string): Promise<Member> {
    try {
      const result = await payload.update({
        collection: Slugs.Collections.MEMBER,
        where: { email: { equals: email } },
        data: { betterAuthUserId },
      })
      return result.docs[0]
    } catch (err) {
      throw err
    }
  }
}
