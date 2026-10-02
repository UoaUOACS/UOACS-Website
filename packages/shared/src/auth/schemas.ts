import { z } from "zod"
import { createMemberSchema, memberSchema } from "../payload/schemas/member"

/**
 * The request and response shapes of the auth service.
 *
 * Shared because both ends validate the same bytes: the website parses form
 * input against these before sending, the auth service parses the body it
 * receives, and the website parses the response that comes back. Three copies
 * drift into accepting and returning different things.
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

export const forgotPasswordBodySchema = forgotPasswordSchema.extend({
  /**
   * Absolute, not a path: Better Auth resolves this against its own base URL,
   * so a relative value would land on the auth service rather than the site
   * the caller meant.
   *
   * Guarded by the auth service's own token check, not by Better Auth —
   * originCheck skips direct server calls, which have no request to inspect.
   * The origin is checked when the emailed link is opened, so it has to be in
   * the auth service's trustedOrigins or every reset link 403s at the callback.
   */
  redirectTo: z.url(),
  /** Path on the caller's site where an unclaimed member finishes signing up. */
  signUpPath: z.string().startsWith("/"),
})

/** What the service sends back, so callers can parse rather than assert. */
export const memberResponseSchema = memberSchema

export const verifyCodeResponseSchema = z.object({
  message: z.string(),
  memberExists: z.boolean(),
})

export const messageResponseSchema = z.object({ message: z.string() })

/** Errors carry a `field` when the problem is a specific input. */
export const apiErrorSchema = z.object({
  error: z.unknown(),
  field: z.string().optional(),
})
