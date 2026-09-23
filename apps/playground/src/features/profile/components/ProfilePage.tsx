"use client"

import { cn } from "@uoacs/ui/utils"
import { useState } from "react"
import type { Profile } from "../types"
import { ProfileHeader } from "./ProfileHeader"
import type { ProfileTab } from "./ProfileTabs"
import { ProfileTabs } from "./ProfileTabs"
import { ProfileToolbar } from "./ProfileToolbar"

const PANEL_ID = "profile-tab-panel"

/**
 * Props for the {@link ProfilePage} component.
 */
export interface ProfilePageProps {
  /**
   * Identity details for the header.
   */
  profile: Profile
  /**
   * Collections the profile can switch between, with their counts.
   */
  tabs: ProfileTab[]
  /**
   * Avatar node passed through to the header.
   */
  avatar?: React.ReactNode
  /**
   * Selected tab id when the parent owns the selection.
   */
  activeTab?: string
  /**
   * Called with the tab id whenever the selection changes.
   */
  onTabChange?: (id: string) => void
  /**
   * Called when the owner clicks "Edit Profile".
   */
  onEditProfile?: () => void
  /**
   * Called when the filter control is clicked.
   */
  onFilter?: () => void
  /**
   * Called when the share control is clicked.
   */
  onShare?: () => void
  /**
   * Contents of the selected tab panel, e.g. the project grid. Rendering that
   * grid is out of scope for this component.
   */
  children?: React.ReactNode
  /**
   * Additional class names for the wrapping element.
   */
  className?: string
}

/**
 * The Project Playground profile layout: identity header, action row with the
 * collection tabs, and the panel the selected collection renders into.
 *
 * Owns the selected tab unless `activeTab` is supplied, and reports every
 * change through `onTabChange`.
 *
 * @param profile Identity details for the header.
 * @param tabs Collections the profile can switch between, with their counts.
 * @param avatar Avatar node passed through to the header.
 * @param activeTab Selected tab id when the parent owns the selection.
 * @param onTabChange Called with the tab id whenever the selection changes.
 * @param onEditProfile Called when the owner clicks "Edit Profile".
 * @param onFilter Called when the filter control is clicked.
 * @param onShare Called when the share control is clicked.
 * @param children Contents of the selected tab panel.
 * @param className Additional class names for the wrapping element.
 * @returns The profile page layout.
 * @example
 * <ProfilePage profile={profile} tabs={tabs}>
 *   <ProjectGrid />
 * </ProfilePage>
 */
export const ProfilePage = ({
  profile,
  tabs,
  avatar,
  activeTab,
  onTabChange,
  onEditProfile,
  onFilter,
  onShare,
  children,
  className,
}: ProfilePageProps) => {
  const [uncontrolledTab, setUncontrolledTab] = useState(tabs[0]?.id)
  const selectedId = activeTab ?? uncontrolledTab
  const selectedTab = tabs.find((tab) => tab.id === selectedId)

  const handleTabChange = (id: string) => {
    setUncontrolledTab(id)
    onTabChange?.(id)
  }

  return (
    <div className={cn("flex w-full flex-col gap-8 md:gap-10", className)}>
      <ProfileHeader avatar={avatar} profile={profile} />
      <ProfileToolbar onEditProfile={onEditProfile} onFilter={onFilter} onShare={onShare}>
        <ProfileTabs
          onValueChange={handleTabChange}
          panelId={PANEL_ID}
          tabs={tabs}
          value={selectedId}
        />
      </ProfileToolbar>
      <div aria-label={selectedTab?.label} id={PANEL_ID} role="tabpanel">
        {children}
      </div>
    </div>
  )
}
