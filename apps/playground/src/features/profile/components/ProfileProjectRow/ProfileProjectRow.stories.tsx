import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { mockProjects } from "@/mocks/profile.mock"
import { ProfileProjectRow } from "./ProfileProjectRow"

const meta = {
  title: "Profile/ProfileProjectRow",
  component: ProfileProjectRow,
  args: { project: mockProjects[0] },
} satisfies Meta<typeof ProfileProjectRow>

export default meta
type Story = StoryObj<typeof meta>

export const WithAward: Story = {}

export const WithoutAward: Story = {
  args: { project: mockProjects[1] },
}
