"use client"

import { PlusIcon } from "@heroicons/react/24/solid"
import { Button } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import Image from "next/image"

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
   * Logo shown in the centre. Defaults to the white wordmark, which is what
   * reads on the gradient behind the bar.
   */
  logoSrc?: string
  /**
   * Additional class names for the wrapping element.
   */
  className?: string
}

/**
 * The Project Playground top bar: create on the left, the UOACS wordmark in
 * the middle, and profile on the right.
 *
 * A placeholder for the playground routes until the shared navbar lands, so it
 * carries no routing of its own and reports both actions to its parent.
 *
 * @param onCreate Called when "Create" is clicked.
 * @param onProfile Called when "Profile" is clicked.
 * @param logoSrc Logo shown in the centre.
 * @param className Additional class names for the wrapping element.
 * @returns The top bar.
 * @example
 * <TopBar onCreate={openEditor} onProfile={goToProfile} />
 */
export const TopBar = ({
  onCreate,
  onProfile,
  logoSrc = "/uoacs-logo-white.svg",
  className,
}: TopBarProps) => {
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between gap-4 px-4 py-4 md:px-10 md:py-6",
        className,
      )}
    >
      <Button
        className="justify-center rounded-md font-cartograph md:h-[33px] md:min-w-[125px]"
        left={<PlusIcon aria-hidden className="size-4" />}
        onClick={onCreate}
      >
        Create
      </Button>

      <Image
        alt="UOACS"
        className="h-4 w-auto md:h-[21px]"
        height={40}
        priority
        src={logoSrc}
        width={168}
      />

      <Button
        className="justify-center rounded-md font-cartograph md:h-[33px] md:min-w-[125px]"
        onClick={onProfile}
      >
        Profile
      </Button>
    </header>
  )
}
