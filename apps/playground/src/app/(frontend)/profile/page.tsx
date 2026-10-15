// Temporary page for testing edit profile details component

import { AuthPages, authPageUrl } from "@uoacs/shared"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { MemberDetailsSection } from "@/features/member/components/MemberDetailsSection/MemberDetailsSection"
import { getAuthMemberDetails } from "@/features/member/member.queries"
import { Routes } from "@/lib/routes"

async function MemberDetails() {
  const result = await getAuthMemberDetails()

  if (result.status === "unauthenticated") {
    redirect(
      authPageUrl(AuthPages.LOGIN, `${process.env.NEXT_PUBLIC_PROJECTS_URL}${Routes.PROFILE}`),
    )
  }
  if (result.status !== "authenticated") {
    return <p>Failed to load member details. Please try again.</p>
  }

  return <MemberDetailsSection member={result.member} />
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <MemberDetails />
    </Suspense>
  )
}
