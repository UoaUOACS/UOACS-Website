import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { mongoClient } from "./mongo"

if (!process.env.BETTER_AUTH_SECRET || !process.env.NEXT_PUBLIC_URL) {
  throw new Error("BETTER_AUTH_SECRET and NEXT_PUBLIC_URL environment variables are not set")
}

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.NEXT_PUBLIC_URL,
  adapter: mongodbAdapter(mongoClient.db()),
  emailAndPassword: {
    enabled: true,
  },
})
