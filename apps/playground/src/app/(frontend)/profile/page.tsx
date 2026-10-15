import { AnimatedSuspense, SessionUnavailable } from "@uoacs/ui"
import { redirect } from "next/navigation"
import { redirectToLogin } from "@/features/auth/auth.helpers"
import { getCurrentMember } from "@/features/member/member.queries"
import { ProfileHeaderSkeleton } from "@/features/profile/components/ProfileHeader/ProfileHeaderView"
import { Routes } from "@/lib/routes"

const OwnProfileRedirect = async () => {
  const result = await getCurrentMember()
  if (result.status === "unauthenticated") redirectToLogin(Routes.PROFILE.ROOT)
  if (result.status === "unavailable") return <SessionUnavailable />
  redirect(Routes.PROFILE.USERNAME(result.member.username))
}

export default function OwnProfilePage() {
  return (
    <div className="mx-auto flex w-full flex-col gap-10 px-4 py-10">
      <AnimatedSuspense fallback={<ProfileHeaderSkeleton />}>
        <OwnProfileRedirect />
      </AnimatedSuspense>
    </div>
  )
}
