"use client"

import { AuthPages, authPageUrl } from "@uoacs/shared"
import { type ReactNode, useEffect } from "react"
import { useSession } from "@/context/SessionContext"

export const UserOnly = ({
  children,
  fallback = null,
}: {
  children: ReactNode
  fallback?: ReactNode
}) => {
  const session = useSession()

  useEffect(() => {
    if (session === null) {
      window.location.assign(authPageUrl(AuthPages.LOGIN, window.location.href))
    }
  }, [session])

  if (session === null) return fallback
  return children
}
