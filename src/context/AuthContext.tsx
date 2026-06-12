"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { ApiRoutes } from "@/lib/routes"
import type { Member } from "@/payload/payload-types"
import type { AuthState } from "@/types/auth"

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null)
  const [memberLoading, setMemberLoading] = useState(true)
  const [memberError, setMemberError] = useState<Error | null>(null)

  const { data: session, isPending } = authClient.useSession()
  const userId = session?.user?.id

  useEffect(() => {
    if (isPending) return
    if (!userId) {
      setMember(null)
      setMemberError(null)
      setMemberLoading(false)
      return
    }
    let cancelled = false
    setMemberLoading(true)
    setMemberError(null)
    fetch(ApiRoutes.MEMBER.ME)
      .then((r) => {
        if (r.ok) return r.json()
        if (r.status === 404) return null
        throw new Error(`Unexpected response: ${r.status}`)
      })
      .then((data) => {
        if (!cancelled) setMember(data)
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("[AuthContext] Failed to fetch member", { userId, error: err })
          setMemberError(err instanceof Error ? err : new Error(String(err)))
        }
      })
      .finally(() => {
        if (!cancelled) setMemberLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [userId, isPending])

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        member,
        isLoading: isPending || memberLoading,
        memberError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
