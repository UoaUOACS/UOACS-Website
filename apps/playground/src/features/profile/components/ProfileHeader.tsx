import { Heading } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import type { Profile } from "../types"

/**
 * Props for the {@link ProfileHeader} component.
 */
export interface ProfileHeaderProps {
  /**
   * Identity details to display.
   */
  profile: Profile
  /**
   * Avatar to render in the circle, e.g. a `next/image`. Falls back to the
   * owner's initials on a grey disc when omitted, so a profile without a
   * picture never renders a broken image.
   */
  avatar?: React.ReactNode
  /**
   * Additional class names for the wrapping element.
   */
  className?: string
}

/**
 * Derives up to two initials from a display name, e.g. "Name Surname" -> "NS".
 */
const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")

/**
 * The identity block at the top of a profile: avatar, name, handle, bio, and
 * link. Purely presentational.
 *
 * @param profile Identity details to display.
 * @param avatar Avatar node rendered in the circle; initials are used instead when omitted.
 * @param className Additional class names for the wrapping element.
 * @returns The profile identity header.
 * @example
 * <ProfileHeader profile={{ name: "Name Surname", username: "username" }} />
 */
export const ProfileHeader = ({ profile, avatar, className }: ProfileHeaderProps) => {
  const { name, username, bio, link } = profile

  return (
    <header
      className={cn(
        "flex w-full flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:gap-10 sm:text-left md:gap-14",
        className,
      )}
    >
      {/*
       * The md sizes here and in the rest of the profile are measured off the
       * hi-fi mock at a 1406px viewport: a 229px avatar, a 44px name, and meta
       * lines at 18px on a 29px pitch.
       */}
      <div className="flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 md:size-[229px]">
        {avatar ?? (
          <span aria-hidden className="font-cartograph text-4xl text-gray-400 md:text-6xl">
            {getInitials(name)}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:pt-4 md:gap-4 md:pt-12">
        <Heading className="justify-center text-center sm:justify-start sm:text-left" h={3}>
          {name}
        </Heading>
        <div className="flex flex-col gap-0.5 font-cartograph text-black text-sm md:text-lg md:leading-[1.6]">
          <p>@{username}</p>
          {bio && <p className="max-w-prose text-gray-700">{bio}</p>}
          {link && (
            <a
              className="w-fit self-center underline-offset-4 transition-colors hover:text-primary hover:underline sm:self-start"
              href={link.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
