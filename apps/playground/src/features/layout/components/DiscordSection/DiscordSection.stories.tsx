import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DiscordAvatars } from "./DiscordAvatars"
import { DiscordSectionSkeleton } from "./DiscordSectionSkeleton"

// `DiscordSection` is an async server component that fetches the live widget, which
// Storybook can't render, so its presentational parts are covered here instead.
const meta: Meta<typeof DiscordAvatars> = {
  title: "Layout/DiscordSection",
  component: DiscordAvatars,
  args: {
    members: Array.from({ length: 8 }, (_, i) => ({
      id: String(i),
      username: `member-${i}`,
      avatar_url: `https://cdn.discordapp.com/embed/avatars/${i % 6}.png`,
    })),
  },
  decorators: [
    (Story) => (
      <div className="flex w-96 bg-gray-800 p-4">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof DiscordAvatars>

export const Avatars: Story = {}

export const NoMembers: Story = {
  args: { members: [] },
}

export const Skeleton: Story = {
  render: () => <DiscordSectionSkeleton />,
}
