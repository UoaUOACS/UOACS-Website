"use client"

import { AdjustmentsHorizontalIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import { Button } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"

/**
 * Props for the {@link ProfileToolbar} component.
 */
export interface ProfileToolbarProps {
  /**
   * Called when the owner clicks "Edit Profile".
   */
  onEditProfile?: () => void
  /**
   * Called when the filter control is clicked. The filter UI itself is out of
   * scope for this component.
   */
  onFilter?: () => void
  /**
   * Called when the share control is clicked.
   */
  onShare?: () => void
  /**
   * Centre slot, typically a {@link ProfileTabs} switcher.
   */
  children?: React.ReactNode
  /**
   * Additional class names for the wrapping element.
   */
  className?: string
}

const ICON_BUTTON_CLASSES =
  "flex cursor-pointer items-center justify-center rounded-full p-2 transition-colors md:size-[50px] md:p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"

/**
 * The action row under the profile header: edit on the left, the tab switcher
 * in the middle, and filter plus share on the right.
 *
 * The three zones sit in a grid from `sm` up so the centre slot stays centred
 * no matter how wide the actions are, and stack into one column below that.
 *
 * @param onEditProfile Called when the owner clicks "Edit Profile".
 * @param onFilter Called when the filter control is clicked.
 * @param onShare Called when the share control is clicked.
 * @param children Centre slot, typically a tab switcher.
 * @param className Additional class names for the wrapping element.
 * @returns The profile action row.
 * @example
 * <ProfileToolbar onEditProfile={openEditor}>
 *   <ProfileTabs tabs={tabs} />
 * </ProfileToolbar>
 */
export const ProfileToolbar = ({
  onEditProfile,
  onFilter,
  onShare,
  children,
  className,
}: ProfileToolbarProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-4 sm:grid sm:grid-cols-[1fr_auto_1fr]",
        className,
      )}
    >
      <div className="flex justify-center sm:justify-start">
        <Button
          className="justify-center rounded-full px-5 font-cartograph md:h-[47px] md:min-w-[192px] md:text-base"
          onClick={onEditProfile}
        >
          Edit Profile
        </Button>
      </div>

      <div className="flex justify-center">{children}</div>

      <div className="flex items-center justify-center gap-2 sm:justify-end">
        <button
          aria-label="Filter"
          className={cn(ICON_BUTTON_CLASSES, "text-primary hover:bg-pink-100")}
          onClick={onFilter}
          type="button"
        >
          <AdjustmentsHorizontalIcon aria-hidden className="size-6 md:size-8" />
        </button>
        <button
          aria-label="Share profile"
          className={cn(ICON_BUTTON_CLASSES, "bg-gray-200 text-gray-800 hover:bg-gray-300")}
          onClick={onShare}
          type="button"
        >
          <ArrowUpTrayIcon aria-hidden className="size-5 md:size-6" />
        </button>
      </div>
    </div>
  )
}
