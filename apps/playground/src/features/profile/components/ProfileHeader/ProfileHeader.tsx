import { getCurrentMember } from "@/features/member/member.queries"
import { type ProfileHeaderProps, ProfileHeaderView } from "./ProfileHeaderView"

/**
 * The top of a member's profile, with an edit button only the profile's owner sees. Checking the
 * owner reads the session, so render this behind a `Suspense` boundary with
 * `ProfileHeaderSkeleton` as the fallback.
 */
export const ProfileHeader = async (props: ProfileHeaderProps) => {
  const current = await getCurrentMember()
  // When the auth service is unavailable, ownership can't be confirmed, so show the visitor's view
  const isOwner = current.status === "authenticated" && current.member.id === props.member.id

  return <ProfileHeaderView {...props} isOwner={isOwner} />
}
