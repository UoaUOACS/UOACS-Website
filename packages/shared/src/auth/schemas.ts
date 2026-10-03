import { z } from "zod"
import { createMemberSchema, memberSchema } from "../payload/schemas/member"

/**
 * Sign-up, verification and member shapes.
 *
 * Shared so the auth app's forms and server actions, and every app that reads
 * a member, validate the same shapes. Separate copies drift into accepting
 * different things.
 */

const password = z.string().min(8, "Password must be at least 8 characters")

/** The account half of sign-up, without the membership details. */
export const accountSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.email({ error: "Please enter a valid email" }),
  password,
})

export type AccountInput = z.infer<typeof accountSchema>

/** A new member: account details plus the full membership form. */
export const signUpSchema = createMemberSchema.extend({ password })

export type SignUpInput = z.infer<typeof signUpSchema>

/** Someone claiming a member row that predates Better Auth. */
export const existingMemberSignUpSchema = accountSchema.extend({
  existingMember: z.literal(true),
})

export const signUpBodySchema = z.union([existingMemberSignUpSchema, signUpSchema])

export type SignUpBody = z.infer<typeof signUpBodySchema>

export const sendCodeSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),
})

export const verifyCodeSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),
  code: z.string().length(6).regex(/^\d+$/),
})

export const forgotPasswordSchema = z.object({
  email: z.email({ error: "Please enter a valid email" }),
})

/** What the service sends back, so callers can parse rather than assert. */
export const memberResponseSchema = memberSchema
