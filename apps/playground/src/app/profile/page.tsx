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
    // `relative` positions the backdrop; the bar and main sit above it at z-10,
    // since the backdrop itself has to paint over this element's background.
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

      {/*
       * max-w + the 40px gutter reproduce the mock's 140px content inset at its
       * 1406px width ((1406 - 1206) / 2 + 40), and hold that gutter below it.
       */}
      <main className="relative z-10 mx-auto w-full max-w-[1206px] px-4 pt-2 pb-16 md:px-10 md:pt-4">
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
