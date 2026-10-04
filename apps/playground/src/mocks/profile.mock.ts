import type { ProfileMember, ProfileProject } from "@/features/profile/types"

export const mockMember: ProfileMember = {
  id: "000000000",
  upi: "abcd123",
  name: "Jane Doe",
}

export const mockProjects: ProfileProject[] = [
  {
    id: "1",
    title: "Title",
    description: "Description",
    likes: 1000,
    award: { title: "Most Creative", event: "UOACS x DEV Hackathon 2026" },
  },
  {
    id: "2",
    title: "Title",
    description: "Description",
    likes: 240,
  },
]
