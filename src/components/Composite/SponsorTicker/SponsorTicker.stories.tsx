import type { Meta, StoryObj } from "@storybook/react"
import { mockSponsors } from "@/mocks/Sponsor.mock"
import { SponsorTicker } from "./SponsorTicker"

const meta: Meta<typeof SponsorTicker> = {
  title: "Composite Components/SponsorTicker",
  component: SponsorTicker,
  argTypes: {
    className: { control: "text" },
  },
  args: {
    className: "",
  },
}

export default meta
type Story = StoryObj<typeof SponsorTicker>

export const Default: Story = {
  args: {
    items: [...mockSponsors, ...mockSponsors, ...mockSponsors, ...mockSponsors, ...mockSponsors],
  },
}
