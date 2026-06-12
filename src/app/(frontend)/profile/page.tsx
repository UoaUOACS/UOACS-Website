"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { Routes } from "@/lib/routes"
import { ProfilePageClient } from "./_components/ProfilePageClient"

export default function ProfilePage() {
  const { user, member, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || !member)) {
      router.replace(Routes.LOGIN)
    }
  }, [isLoading, user, member, router])

  if (isLoading) return <p>Loading...</p>

  if (!user || !member) return null

  return <ProfilePageClient member={member} />
}
