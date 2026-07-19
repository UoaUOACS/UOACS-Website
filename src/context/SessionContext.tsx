import { createContext, type ReactNode, useContext, useRef } from "react"
import { authClient } from "@/lib/auth-client"

export type Session = typeof authClient.$Infer.Session | null

const SessionContext = createContext<Session | undefined>(undefined)

export function useSession(): Session {
  const context = useContext(SessionContext)
  if (context === undefined) throw new Error("useSession must be used within Providers")
  return context
}

export const SessionProvider = ({
  children,
  initialSession,
}: {
  children: ReactNode
  initialSession?: Session
}) => {
  const { data: clientSession, isPending } = authClient.useSession()
  const hasResolvedOnce = useRef(false)
  if (!isPending) hasResolvedOnce.current = true

  const session = isPending && !hasResolvedOnce.current ? initialSession : (clientSession ?? null)

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
}
