import { AuthPages, authPageUrl } from "@uoacs/shared"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/auth-session"
import { Routes, websiteUrl } from "@/lib/routes"
import { UserOnly } from "../_components/UserOnly"
import { ProfilePageClient } from "./_components/ProfilePageClient"

export default async function ProfilePage() {
  const session = await getSession()
  if (!session) redirect(authPageUrl(AuthPages.LOGIN, websiteUrl(Routes.PROFILE)))
  return (
    <UserOnly>
      <ProfilePageClient user={session.user} />
    </UserOnly>
  )
}
