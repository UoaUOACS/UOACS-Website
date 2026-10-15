import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getMemberByUsernameCached } from "@/features/member/member.queries"
import { ProfileAbout } from "@/features/profile/components/ProfileAbout/ProfileAbout"
import { ProfileHeader } from "@/features/profile/components/ProfileHeader/ProfileHeader"
import { ProfileHeaderSkeleton } from "@/features/profile/components/ProfileHeader/ProfileHeaderView"
import { ProfileProjects } from "@/features/profile/components/ProfileProjects/ProfileProjects"
import { ProfileTabs } from "@/features/profile/components/ProfileTabs/ProfileTabs"

interface ProfilePageProps {
  params: Promise<{ username: string }>
}

const ProfileContent = async ({ params }: ProfilePageProps) => {
  const { username } = await params

  const member = await getMemberByUsernameCached(username)
  if (!member) notFound()

  return (
    <>
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeader member={member} />
      </Suspense>

      <ProfileTabs
        panels={{
          Projects: <ProfileProjects memberID={member.id} />,
          About: <ProfileAbout biography={member.bio} skills={member.skills ?? undefined} />,
        }}
      />
    </>
  )
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <div className="mx-auto flex w-full flex-col gap-10 px-4 py-10">
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileContent params={params} />
      </Suspense>
    </div>
  )
}
