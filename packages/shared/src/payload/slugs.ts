/**
 * Payload collection slugs owned by the auth service.
 *
 * Shared because both `apps/auth` and `apps/website` resolve these against same db
 */
export const AuthCollectionSlugs = {
  MEMBER: "member",
  EMAIL_VERIFICATION_CODE: "email-verification-code",
} as const

export type AuthCollectionSlug = (typeof AuthCollectionSlugs)[keyof typeof AuthCollectionSlugs]
