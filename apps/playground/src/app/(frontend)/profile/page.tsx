import type { Metadata } from "next"
import { ProfilePage } from "@/features/profile/components/ProfilePage/ProfilePage"
import { mockMember, mockProjects } from "@/mocks/profile.mock"

export const metadata: Metadata = { title: "Profile" }

// TODO: replace the mock data once the Member collection (#455) lands.
export default function Page() {
  return <ProfilePage member={mockMember} projects={mockProjects} />
}
