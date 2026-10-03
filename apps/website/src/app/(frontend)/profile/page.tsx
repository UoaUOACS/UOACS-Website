import { AuthPages, authPageUrl } from "@uoacs/shared"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth/auth-session"
import { Routes } from "@/lib/routes"
import { UserOnly } from "../_components/UserOnly"
import { ProfilePageClient } from "./_components/ProfilePageClient"

export default async function ProfilePage() {
  const session = await getSession()
  if (!session)
    redirect(
      authPageUrl(AuthPages.LOGIN, `${process.env.NEXT_PUBLIC_WEBSITE_URL}${Routes.PROFILE}`),
    )
  return (
    <UserOnly>
      <ProfilePageClient user={session.user} />
    </UserOnly>
  )
}
