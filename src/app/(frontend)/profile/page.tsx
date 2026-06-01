import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Routes } from "@/lib/routes"
import { AuthService } from "@/services/auth.service"
import { ProfilePageClient } from "./_components/ProfilePageClient"

const authService = new AuthService()

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    redirect(Routes.LOGIN)
  }

  const member = await authService.getMemberFromUser(session.user)

  if (!member) {
    redirect(Routes.LOGIN)
  }

  return <ProfilePageClient member={member} user={session.user} />
}
