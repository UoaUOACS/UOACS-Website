import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth-session"
import { Routes } from "@/lib/routes"
import { UserOnly } from "../_components/UserOnly"
import { ProfilePageClient } from "./_components/ProfilePageClient"

export default async function ProfilePage() {
  const session = await getSession()
  if (!session) redirect(Routes.LOGIN)
  return (
    <UserOnly>
      <ProfilePageClient user={session.user} />
    </UserOnly>
  )
}
