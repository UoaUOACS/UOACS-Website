"use client"

import { EmptyState } from "@uoacs/ui"
import { TopBar } from "@/components/TopBar"
import { ProfileBackdrop, ProfilePage } from "@/features/profile/components"
import { mockProfile, mockProfileTabs } from "@/mocks/Profile.mock"

/**
 * Playground route for the profile layout, wired to mock data. The actions log
 * for now: creating, editing, filtering, and sharing are follow-up work.
 */
export default function Profile() {
  return (
    <div className="relative flex flex-1 flex-col bg-white text-black">
      <ProfileBackdrop />

      <TopBar
        className="relative z-10"
        onCreate={() => {
          console.info("[profile] create clicked")
        }}
        onProfile={() => {
          console.info("[profile] profile clicked")
        }}
      />

      <main className="relative z-10 mx-auto w-full max-w-[1206px] px-4 pt-2 pb-16 md:px-10 md:pt-5">
        <ProfilePage
          onEditProfile={() => {
            console.info("[profile] edit profile clicked")
          }}
          onFilter={() => {
            console.info("[profile] filter clicked")
          }}
          onShare={() => {
            console.info("[profile] share clicked")
          }}
          onTabChange={(id) => {
            console.info("[profile] tab changed", { id })
          }}
          profile={mockProfile}
          tabs={mockProfileTabs}
        >
          <EmptyState
            description="Project cards are handled separately; this panel is where they land."
            title="Nothing here yet"
          />
        </ProfilePage>
      </main>
    </div>
  )
}
