"use client"

import { EmptyState } from "@uoacs/ui"
import { ProfileBackdrop, ProfilePage } from "@/features/profile/components"
import { mockProfile, mockProfileTabs } from "@/mocks/Profile.mock"

/**
 * Playground route for the profile layout, wired to mock data. The actions log
 * for now: editing, filtering, and sharing are follow-up work.
 */
export default function Profile() {
  return (
    <main className="relative flex flex-1 flex-col items-center bg-white px-4 py-10 text-black md:px-12">
      <ProfileBackdrop />
      <ProfilePage
        className="relative z-10 max-w-[1480px]"
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
  )
}
