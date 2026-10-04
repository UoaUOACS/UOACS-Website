"use client"

import { cn } from "@uoacs/ui/utils"
import { type ReactNode, useState } from "react"

export const PROFILE_TABS = ["Projects", "About", "Hackathon", "Awards"] as const
export type ProfileTab = (typeof PROFILE_TABS)[number]

interface ProfileTabsProps {
  panels: Partial<Record<ProfileTab, ReactNode>>
}

export const ProfileTabs = ({ panels }: ProfileTabsProps) => {
  const [selected, setSelected] = useState<ProfileTab>("Projects")

  return (
    <div className="flex w-full flex-col gap-12">
      <div className="relative">
        <div className="flex justify-center gap-6 pb-8 sm:gap-40" role="tablist">
          {PROFILE_TABS.map((tab) => (
            <button
              aria-controls={`profile-panel-${tab}`}
              aria-selected={tab === selected}
              className={cn(
                "font-mono text-lg transition-colors",
                tab === selected ? "font-medium text-black" : "text-gray-400 hover:text-gray-600",
              )}
              id={`profile-tab-${tab}`}
              key={tab}
              onClick={() => setSelected(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Decorative divider from the design: pink fading into blue */}
        <div aria-hidden="true" className="h-px bg-linear-to-r from-pink-300 to-blue-400" />
      </div>

      <div
        aria-labelledby={`profile-tab-${selected}`}
        id={`profile-panel-${selected}`}
        role="tabpanel"
      >
        {panels[selected]}
      </div>
    </div>
  )
}
