import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { mockSponsors } from "@/mocks/Sponsor.mock"
import { SponsorTicker } from "./SponsorTicker"

const meta: Meta<typeof SponsorTicker> = {
  title: "Generic Components/SponsorTicker",
  component: SponsorTicker,
  argTypes: {
    containerClassName: { control: "text" },
  },
  args: {
    containerClassName: "",
  },
}

export default meta
type Story = StoryObj<typeof SponsorTicker>

export const Default: Story = {
  args: {
    items: [...mockSponsors, ...mockSponsors, ...mockSponsors, ...mockSponsors, ...mockSponsors],
  },
}
