import { EllipsisHorizontalIcon, PencilIcon, UserIcon } from "@heroicons/react/24/outline"
import { LazyImage } from "@uoacs/ui"
import type { ProfileMember } from "@/features/profile/types"

interface ProfileHeaderProps {
  member: ProfileMember
}

export const ProfileHeader = ({ member }: ProfileHeaderProps) => (
  <header className="flex w-full flex-col items-center gap-8 sm:flex-row sm:gap-12">
    <div className="relative size-40 shrink-0 overflow-hidden rounded-full bg-gray-200 sm:size-60">
      {member.avatarURL ? (
        <LazyImage
          alt={member.name}
          className="object-cover!"
          containerClassName="h-full w-full"
          fill
          sizes="240px"
          src={member.avatarURL}
        />
      ) : (
        <UserIcon aria-hidden="true" className="size-full p-10 text-gray-400" />
      )}
    </div>

    <div className="flex flex-col items-center gap-2 sm:items-start">
      <p className="font-mono text-sm uppercase">
        <span className="text-pink-500">{/*  */}</span> Your account
      </p>
      <h1 className="font-inter font-semibold text-4xl tracking-tight sm:text-6xl">
        {member.name}
        <span className="text-pink-500">.</span>
      </h1>
      <p className="font-mono text-sm">
        UPI <span className="font-medium">{member.upi}</span> / ID{" "}
        <span className="font-medium">{member.id}</span>
      </p>

      <div className="mt-4 flex items-center gap-3">
        <button
          className="flex h-20 items-center gap-3 rounded-lg bg-black px-7 text-2xl text-white"
          type="button"
        >
          <PencilIcon aria-hidden="true" className="size-7" />
          edit profile
        </button>
        <button
          aria-label="More options"
          className="flex size-20 items-center justify-center rounded-full bg-black text-white"
          type="button"
        >
          <EllipsisHorizontalIcon aria-hidden="true" className="size-8" />
        </button>
      </div>
    </div>
  </header>
)
