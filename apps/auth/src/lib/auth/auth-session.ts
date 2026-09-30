import { headers } from "next/headers"
import { unstable_rethrow } from "next/navigation"
import { cache } from "react"
import { auth } from "./auth"

export const getSession = cache(async () => {
  try {
    return await auth.api.getSession({ headers: await headers() })
  } catch (err) {
    unstable_rethrow(err)
    console.error("[getSession] auth.api.getSession threw unexpectedly", { error: err })
    return null
  }
})
