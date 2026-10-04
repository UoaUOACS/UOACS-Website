import { UserIcon } from "@heroicons/react/24/outline"
import type { Member as AuthMember } from "@uoacs/shared/payload"
import { Button, Heading, LazyImage, Skeleton } from "@uoacs/ui"
import PenLineIcon from "@/features/profile/components/PenLineIcon/PenLineIcon"
import type { Member } from "@/payload/payload-types"

const LAYOUT_CLASS_NAME = "flex flex-col gap-6 md:flex-row md:items-center md:gap-12"
const AVATAR_CLASS_NAME =
  "relative size-28 shrink-0 overflow-hidden rounded-full bg-gray-200 md:size-52"

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
  <p className="font-mono text-xs">
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
            containerClassName="h-full w-full"
            fill
            sizes="208px"
            src={profilePictureURL}
          />
        ) : (
          <UserIcon aria-hidden="true" className="size-full p-[20%] text-gray-400" />
        )}
      </div>

      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-col items-start gap-2">
          <AccountLabel />
          <Heading className="justify-start text-left" h={3} period>
            {name}
          </Heading>
          <p className="flex flex-row justify-start gap-2 font-mono text-xs">
            <span>
              UPI <span className="font-bold text-black">{account.upi}</span>
            </span>
            <span> / </span>
            <span>
              ID <span className="font-bold text-black">{account.uoaID}</span>
            </span>
          </p>
        </div>
        <Button
          className="font-light"
          left={<PenLineIcon className="size-4" />}
          shape="rounded"
          size="lg"
          theme="dark"
        >
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
    <Skeleton className={AVATAR_CLASS_NAME} shape="circle" />

    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col items-start gap-2">
        <AccountLabel />
        <Skeleton className="heading-3 w-56" shape="text" />
        <Skeleton className="h-4 w-48" shape="text" />
      </div>
      <Skeleton className="h-16.75 w-45 rounded-[10px]" />
    </div>
  </div>
)
