import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { mongoClient } from "@/lib/mongo"
import { PayloadEmailService } from "@/services/email/payload-email.service"

if (!process.env.BETTER_AUTH_SECRET || !process.env.NEXT_PUBLIC_URL) {
  const missingEnvVars = []
  if (!process.env.BETTER_AUTH_SECRET) missingEnvVars.push("BETTER_AUTH_SECRET")
  if (!process.env.NEXT_PUBLIC_URL) missingEnvVars.push("NEXT_PUBLIC_URL")
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
}

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_URL,
  database: mongodbAdapter(mongoClient.db()),
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
