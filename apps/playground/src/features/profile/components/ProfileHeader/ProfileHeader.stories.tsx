import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { mockMember } from "@/mocks/profile.mock"
import { ProfileHeader } from "./ProfileHeader"

const meta = {
  title: "Profile/ProfileHeader",
  component: ProfileHeader,
  args: { member: mockMember },
} satisfies Meta<typeof ProfileHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongName: Story = {
  args: { member: { ...mockMember, name: "Alexandria Montgomery-Whitfield" } },
}
