"use client"

import { authClient } from "@uoacs/shared/auth"
import { createContext, type ReactNode, useContext } from "react"

export type Session = typeof authClient.$Infer.Session | null

export const SessionContext = createContext<Session | undefined>(undefined)

export function useSession(): Session {
  const context = useContext(SessionContext)
  if (context === undefined) throw new Error("useSession must be used within SessionProvider")
  return context
}

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = authClient.useSession()

  return <SessionContext.Provider value={session ?? null}>{children}</SessionContext.Provider>
}
