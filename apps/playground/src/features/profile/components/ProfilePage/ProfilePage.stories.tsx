import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { mockMember, mockProjects } from "@/mocks/profile.mock"
import { ProfilePage } from "./ProfilePage"

const meta = {
  title: "Profile/ProfilePage",
  component: ProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="relative mx-auto max-w-[1480px] px-4 py-15 md:px-12 lg:px-20">
        <Story />
      </div>
    ),
  ],
  args: { member: mockMember, projects: mockProjects },
} satisfies Meta<typeof ProfilePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoProjects: Story = {
  args: { projects: [] },
}
