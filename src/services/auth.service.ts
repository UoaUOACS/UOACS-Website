import { ValidationError } from "payload"
import { payload } from "@/lib/payload"
import type { Member } from "@/payload/payload-types"
import { createMemberSchema } from "@/types/schemas/member"
import { Slugs } from "./../lib/slugs"

export class DuplicateFieldError extends Error {
  constructor(public readonly field: string) {
    super("Value already in use")
    this.name = "DuplicateFieldError"
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
}
