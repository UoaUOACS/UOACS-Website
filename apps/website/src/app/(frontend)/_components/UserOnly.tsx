"use client"

import { useRouter } from "next/navigation"
import { type ReactNode, useEffect } from "react"
import { useSession } from "@/context/SessionContext"
import { Routes } from "@/lib/routes"

export const UserOnly = ({
  children,
  fallback = null,
}: {
  children: ReactNode
  fallback?: ReactNode
}) => {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session === null) {
      router.replace(Routes.LOGIN)
    }
  }, [session, router])

  if (session === null) return fallback
  return children
}
