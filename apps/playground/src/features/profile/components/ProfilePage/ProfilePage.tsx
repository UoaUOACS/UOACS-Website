import { ProfileHeader } from "@/features/profile/components/ProfileHeader/ProfileHeader"
import { ProfileProjectRow } from "@/features/profile/components/ProfileProjectRow/ProfileProjectRow"
import { ProfileTabs } from "@/features/profile/components/ProfileTabs/ProfileTabs"
import type { ProfileMember, ProfileProject } from "@/features/profile/types"

interface ProfilePageProps {
  member: ProfileMember
  projects: ProfileProject[]
}

export const ProfilePage = ({ member, projects }: ProfilePageProps) => (
  <div className="flex w-full flex-col gap-24">
    {/* Decorative pink glow behind the top-right of the page */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 right-0 -z-10 h-160 w-2/3 bg-[radial-gradient(ellipse_at_top_right,var(--color-pink-300),transparent_65%)]"
    />

    <ProfileHeader member={member} />

    <ProfileTabs
      panels={{
        Projects: (
          <div className="flex flex-col gap-16">
            {projects.map((project) => (
              <ProfileProjectRow key={project.id} project={project} />
            ))}
          </div>
        ),
      }}
    />
  </div>
)
