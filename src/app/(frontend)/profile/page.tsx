"use client"

import { redirect } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Routes } from "@/lib/routes"
import { ProfilePageClient } from "./_components/ProfilePageClient"

export default function ProfilePage() {
  const { user, member, isLoading } = useAuth()

  if (isLoading) return <p>Loading...</p>

  if (!user || !member) {
    redirect(Routes.LOGIN)
  }

  return <ProfilePageClient member={member} />
}
