import type { ProfileTab } from "@/features/profile/components"
import type { Profile } from "@/features/profile/types"

export const mockProfile: Profile = {
  name: "Firstname Lastname",
  username: "username",
  bio: "Short bio goes here - a line or two about what you build.",
  link: { label: "yourlink.com", href: "https://example.com" },
}

export const mockProfileTabs: ProfileTab[] = [
  { id: "projects", label: "Projects", count: 8 },
  { id: "awards", label: "Awards", count: 0 },
]
