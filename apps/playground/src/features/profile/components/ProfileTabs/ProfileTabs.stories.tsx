import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { EmptyState } from "@uoacs/ui"
import { ProfileTabs } from "./ProfileTabs"

const meta = {
  title: "Profile/ProfileTabs",
  component: ProfileTabs,
  args: {
    panels: {
      Projects: <p>Projects panel</p>,
      About: (
        <EmptyState
          description="This member hasn't added any details yet."
          title="Nothing here yet"
        />
      ),
    },
  },
} satisfies Meta<typeof ProfileTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
