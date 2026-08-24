import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SponsorTier } from "@/types/enums"
import { SponsorBadge, type SponsorBadgeProps } from "./SponsorBadge"

const meta: Meta<SponsorBadgeProps> = {
  title: "Generic Components/SponsorBadge",
  component: SponsorBadge,
  args: {
    tier: "gold",
  },
  argTypes: {
    tier: {
      control: { type: "select" },
      options: Object.values(SponsorTier),
    },
  },
}

export default meta
type Story = StoryObj<SponsorBadgeProps>

export const Default: Story = {}
