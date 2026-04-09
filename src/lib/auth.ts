import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { mongoClient } from "./mongo"

if (!process.env.BETTER_AUTH_SECRET || !process.env.BETTER_AUTH_URL) {
  throw new Error("BETTER_AUTH_SECRET and BETTER_AUTH_URL environment variables are not set")
}

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  url: process.env.BETTER_AUTH_URL,
  adapter: mongodbAdapter(mongoClient.db()),
  emailAndPassword: {
    enabled: true,
  },
})
