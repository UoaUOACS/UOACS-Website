import type { SessionResult } from "@uoacs/shared"
import { authClient } from "@uoacs/shared/auth"
import { createContext, type ReactNode, useContext, useRef } from "react"

export type Session = typeof authClient.$Infer.Session | null

export const SessionContext = createContext<SessionResult | undefined>(undefined)

/** The full lookup result, for pages that must tell signed out from unreachable. */
export function useSessionResult(): SessionResult {
  const context = useContext(SessionContext)
  if (context === undefined) throw new Error("useSession must be used within Providers")
  return context
}

/** The signed-in session, or `null` when signed out or the auth service is unreachable. */
export function useSession(): Session {
  const result = useSessionResult()
  return result.status === "authenticated" ? result.session : null
}

export const SessionProvider = ({
  children,
  initialSession,
}: {
  children: ReactNode
  initialSession: SessionResult
}) => {
  const { data, error, isPending } = authClient.useSession()
  const hasResolvedOnce = useRef(false)
  if (!isPending) hasResolvedOnce.current = true

  let result: SessionResult
  if (isPending && !hasResolvedOnce.current) result = initialSession
  else if (data) result = { status: "authenticated", session: data }
  // Better Auth reports a missing session as a 401; anything else, including
  // a failed request, means it could not say either way.
  else if (error && error.status !== 401) result = { status: "unavailable" }
  else result = { status: "unauthenticated" }

  return <SessionContext.Provider value={result}>{children}</SessionContext.Provider>
}
