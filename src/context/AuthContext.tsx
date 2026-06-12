"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import type { Member } from "@/payload/payload-types"
import type { AuthState } from "@/types/auth"

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<Member | null>(null)
  const [memberLoading, setMemberLoading] = useState(false)

  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!session?.user) {
      setMember(null)
      return
    }
    setMemberLoading(true)
    fetch("/api/member/me")
      .then((r) => (r.ok ? r.json() : null))
      .then(setMember)
      .finally(() => setMemberLoading(false))
  }, [session?.user])

  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, member, isLoading: isPending || memberLoading }}
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
