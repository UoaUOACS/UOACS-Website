import { headers } from "next/headers"
import { cache } from "react"
import { auth } from "@/lib/auth"

export const getSession = cache(async () => {
  try {
    return await auth.api.getSession({ headers: await headers() })
  } catch (err) {
    console.error("[getSession] auth.api.getSession threw unexpectedly", { error: err })
    return null
  }
})
