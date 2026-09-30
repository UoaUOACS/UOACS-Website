import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { mockSponsors } from "@/features/sponsor/mocks/Sponsor.mock"
import { SponsorLogos, SponsorLogosSkeleton } from "./SponsorLogos"

const meta: Meta<typeof SponsorLogos> = {
  title: "Components/SponsorLogos",
  component: SponsorLogos,
  argTypes: {
    sponsors: { control: "object" },
  },
  args: {
    sponsors: mockSponsors,
  },
}

export default meta
type Story = StoryObj<typeof SponsorLogos>

export const Row: Story = {}

export const Ticker: Story = {
  args: {
    sponsors: [...mockSponsors, ...mockSponsors],
  },
}

export const Loading: StoryObj<typeof SponsorLogosSkeleton> = {
  render: () => <SponsorLogosSkeleton />,
}
