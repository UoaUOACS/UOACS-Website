import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { mongoClient } from "@/lib/mongo"
import { PayloadEmailService } from "@/services/email/payload-email.service"

if (!process.env.BETTER_AUTH_SECRET || !process.env.NEXT_PUBLIC_AUTH_URL) {
  const missingEnvVars = []
  if (!process.env.BETTER_AUTH_SECRET) missingEnvVars.push("BETTER_AUTH_SECRET")
  if (!process.env.NEXT_PUBLIC_AUTH_URL) missingEnvVars.push("NEXT_PUBLIC_AUTH_URL")
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
}

/**
 * Origins allowed to call this service. Better Auth rejects requests from
 * anywhere else, and the route handler only returns CORS headers to these.
 *
 * Normalised, because the route compares these against the Origin header the
 * browser sends. Better Auth normalises its own copy, so a configured value
 * carrying a trailing slash would pass its check and fail the route's.
 */
export const trustedOrigins = [
  process.env.NEXT_PUBLIC_WEBSITE_URL,
  process.env.NEXT_PUBLIC_PROJECTS_URL,
]
  .filter((origin): origin is string => Boolean(origin))
  .map((origin) => new URL(origin).origin)

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  database: mongodbAdapter(mongoClient.db()),
  trustedOrigins,
  advanced: {
    // The session cookie is set by this service but has to be readable by the
    // website and playground. Unset locally, where they are ports on localhost
    // and cookies are already shared; set to the shared parent (".uoacs.co.nz")
    // once they are deployed as subdomains.
    crossSubDomainCookies: process.env.AUTH_COOKIE_DOMAIN
      ? { enabled: true, domain: process.env.AUTH_COOKIE_DOMAIN }
      : undefined,
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }, _request) => {
      void PayloadEmailService.sendResetPassword(user.email, url).catch((error) => {
        console.error("[Auth/sendResetPassword] Failed to send reset email", { error })
      })
    },
    revokeSessionsOnPasswordReset: true,
  },
})
