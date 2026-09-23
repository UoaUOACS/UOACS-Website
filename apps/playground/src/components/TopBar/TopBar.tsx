"use client"

import { PlusIcon } from "@heroicons/react/24/solid"
import { Button } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"

/**
 * Props for the {@link TopBar} component.
 */
export interface TopBarProps {
  /**
   * Called when "Create" is clicked.
   */
  onCreate?: () => void
  /**
   * Called when "Profile" is clicked.
   */
  onProfile?: () => void
  /**
   * Wordmark shown in the centre.
   */
  wordmark?: string
  /**
   * Additional class names for the wrapping element.
   */
  className?: string
}

/**
 * The Project Playground top bar: create on the left, wordmark in the middle,
 * profile on the right.
 *
 * A placeholder for the playground routes until the shared navbar lands, so it
 * carries no routing of its own and reports both actions to its parent.
 *
 * @param onCreate Called when "Create" is clicked.
 * @param onProfile Called when "Profile" is clicked.
 * @param wordmark Wordmark shown in the centre.
 * @param className Additional class names for the wrapping element.
 * @returns The top bar.
 * @example
 * <TopBar onCreate={openEditor} onProfile={goToProfile} />
 */
export const TopBar = ({ onCreate, onProfile, wordmark = "UOACS", className }: TopBarProps) => {
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between gap-4 px-4 py-4 md:px-10 md:py-6",
        className,
      )}
    >
      <Button
        className="rounded-md font-cartograph md:h-8"
        left={<PlusIcon aria-hidden className="size-4" />}
        onClick={onCreate}
      >
        Create
      </Button>

      <span className="font-cartograph text-lg text-white tracking-[0.25em] md:text-xl">
        {wordmark}
      </span>

      <Button className="rounded-md font-cartograph md:h-8" onClick={onProfile}>
        Profile
      </Button>
    </header>
  )
}
