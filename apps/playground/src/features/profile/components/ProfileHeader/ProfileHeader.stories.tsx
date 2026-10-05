import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { mockAccount, mockMember } from "@/features/profile/mocks/Member.mock"
import { ProfileHeader, ProfileHeaderSkeleton } from "./ProfileHeader"

const meta = {
  title: "Profile/ProfileHeader",
  component: ProfileHeader,
  args: { member: mockMember, account: mockAccount },
} satisfies Meta<typeof ProfileHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithProfilePicture: Story = {
  args: {
    member: {
      ...mockMember,
      profilePicture: {
        id: "68e380871023ec09c1a45eb3",
        alt: "Profile picture",
        url: "https://placehold.co/240x240?text=PFP",
        createdAt: "2026-01-04T02:22:09.601Z",
        updatedAt: "2026-01-04T02:22:09.601Z",
      },
    },
  },
}

export const LongName: Story = {
  args: {
    account: { ...mockAccount, firstName: "Maximiliana Alexandria", lastName: "Montgomery" },
  },
}

export const Loading: Story = {
  render: () => <ProfileHeaderSkeleton />,
}
