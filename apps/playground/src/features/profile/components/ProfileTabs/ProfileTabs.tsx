"use client"

import { Button } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import { type ReactNode, useState } from "react"
import { PROFILE_TABS, type ProfileTab } from "@/features/profile/profile.constants"

interface ProfileTabsProps {
  /**
   * The content of each tab. Pass `null` or an `EmptyState` for a tab with nothing to show.
   */
  panels: Record<ProfileTab, ReactNode>
}

export const ProfileTabs = ({ panels }: ProfileTabsProps) => {
  const [selected, setSelected] = useState<ProfileTab>(PROFILE_TABS[0])

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex justify-center gap-6 sm:gap-28" role="tablist">
        {PROFILE_TABS.map((tab) => (
          <Button
            aria-controls={`profile-panel-${tab}`}
            aria-selected={tab === selected}
            className={cn(tab === selected ? "text-black" : "text-gray-400 hover:text-gray-600")}
            font="cartograph"
            id={`profile-tab-${tab}`}
            key={tab}
            onClick={() => setSelected(tab)}
            role="tab"
            theme="ghost"
          >
            {tab}
          </Button>
        ))}
      </div>
      <div aria-hidden="true" className="h-px bg-linear-to-r from-pink-300 to-blue-400" />
      <section
        aria-labelledby={`profile-tab-${selected}`}
        id={`profile-panel-${selected}`}
        role="tabpanel"
      >
        {panels[selected]}
      </section>
    </div>
  )
}
