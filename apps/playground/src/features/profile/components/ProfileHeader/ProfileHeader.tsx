import { PencilIcon, UserIcon } from "@heroicons/react/24/outline"
import type { Member as AuthMember } from "@uoacs/shared/payload"
import { Button, Heading, LazyImage, Skeleton } from "@uoacs/ui"
import type { Member } from "@/payload/payload-types"

// From md up, a grid row (unlike a flex row) lets the square avatar take its width from the
// details' height. Its contents are absolutely positioned so they don't add to that height.
// When a long name wraps, the avatar is capped to its column and clipped to a centred circle
// rather than overlapping the details. Phones stack a fixed-size avatar instead.
const LAYOUT_CLASS_NAME = "flex flex-col gap-6 md:grid md:grid-cols-[auto_minmax(0,1fr)] md:gap-10"
const AVATAR_CLASS_NAME =
  "relative aspect-square size-28 bg-gray-200 [clip-path:circle(closest-side)] md:h-full md:w-auto md:max-w-full"

export interface ProfileHeaderProps {
  /**
   * The member's playground profile, for their profile picture.
   */
  member: Member
  /**
   * The member's record from the auth service, for their name, UPI and ID.
   */
  account: Pick<AuthMember, "firstName" | "lastName" | "upi" | "uoaID">
}

const AccountLabel = () => (
  <p className="font-mono">
    {/** biome-ignore lint/suspicious/noCommentText: the // is not for a comment */}
    <span className="text-primary">// </span>YOUR ACCOUNT
  </p>
)

/**
 * The top of a member's profile: their profile picture, name, UPI and ID, and an edit button.
 */
export const ProfileHeader = ({ member, account }: ProfileHeaderProps) => {
  const { profilePicture } = member
  const name = `${account.firstName} ${account.lastName}`
  const profilePictureURL = typeof profilePicture === "object" ? profilePicture?.url : undefined

  return (
    <header className={LAYOUT_CLASS_NAME}>
      <div className={AVATAR_CLASS_NAME}>
        {profilePictureURL ? (
          <LazyImage
            alt={name}
            className="object-cover!"
            containerClassName="absolute! inset-0"
            fill
            sizes="240px"
            src={profilePictureURL}
          />
        ) : (
          <UserIcon
            aria-hidden="true"
            className="absolute inset-0 size-full p-[20%] text-gray-400"
          />
        )}
      </div>

      <div className="flex flex-col items-start gap-6">
        <div className="flex flex-col items-start gap-2">
          <AccountLabel />
          <Heading className="justify-start text-left" h={2} period>
            {name}
          </Heading>
          <p className="flex flex-row justify-start gap-2 font-mono">
            <span>
              UPI <span className="font-bold text-black">{account.upi}</span>
            </span>
            <span> / </span>
            <span>
              ID <span className="font-bold text-black">{account.uoaID}</span>
            </span>
          </p>
        </div>
        <Button left={<PencilIcon className="size-4" />} shape="rounded" size="lg" theme="dark">
          edit profile
        </Button>
      </div>
    </header>
  )
}

/**
 * A loading placeholder with the same layout as {@link ProfileHeader}.
 */
export const ProfileHeaderSkeleton = () => (
  <div aria-hidden="true" className={LAYOUT_CLASS_NAME}>
    <div className={AVATAR_CLASS_NAME}>
      <Skeleton className="absolute inset-0 size-full" shape="circle" />
    </div>

    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <AccountLabel />
        <Skeleton className="heading-2 w-64" shape="text" />
        <Skeleton className="h-6 w-56" shape="text" />
      </div>
      <Skeleton className="h-16.75 w-48 rounded-[10px]" />
    </div>
  </div>
)
