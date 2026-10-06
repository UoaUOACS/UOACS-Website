import type { SessionResult } from "@uoacs/shared"
import { authClient } from "@uoacs/shared/auth"
import { createContext, type ReactNode, useContext } from "react"

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
  const { data, error, isPending, isRefetching } = authClient.useSession()
  // No session normally comes back as `data: null` with no error;
  // a 401 also means signed out. Any other error, including a
  // failed request, isn't an answer, so fall back to the server's.
  let result: SessionResult
  if (data) result = { status: "authenticated", session: data }
  else if (isPending || isRefetching || (error && error.status !== 401)) result = initialSession
  else result = { status: "unauthenticated" }

  return <SessionContext.Provider value={result}>{children}</SessionContext.Provider>
}
