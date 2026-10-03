"use client"

import { AuthPages, authPageUrl } from "@uoacs/shared"
import { type ReactNode, useEffect } from "react"
import { useSession } from "@/context/SessionContext"
import { isLoggingOut, useGuardedPage } from "@/lib/auth/log-out"

export const UserOnly = ({
  children,
  fallback = null,
}: {
  children: ReactNode
  fallback?: ReactNode
}) => {
  const session = useSession()
  useGuardedPage()

  useEffect(() => {
    // A deliberate log-out sends the person home itself (see `logOut`).
    if (session === null && !isLoggingOut()) {
      window.location.assign(authPageUrl(AuthPages.LOGIN, window.location.href))
    }
  }, [session])

  if (session === null) return fallback
  return children
}
