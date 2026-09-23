import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { mockProfile } from "@/mocks/Profile.mock"
import { ProfileHeader } from "./ProfileHeader"

const meta: Meta<typeof ProfileHeader> = {
  title: "Features/Profile/ProfileHeader",
  component: ProfileHeader,
  args: { profile: mockProfile },
}

export default meta
type Story = StoryObj<typeof ProfileHeader>

export const Default: Story = {}

/** Bio and link are optional; the block collapses without them. */
export const MinimalDetails: Story = {
  args: { profile: { name: "Firstname Lastname", username: "username" } },
}

/** A supplied avatar replaces the initials fallback. */
export const WithAvatar: Story = {
  args: {
    avatar: (
      <div className="size-full bg-[linear-gradient(135deg,var(--color-pink-400),var(--color-orange-300))]" />
    ),
  },
}

/** Guards the stacked layout on small screens. */
export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
}
