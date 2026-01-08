import type { Meta, StoryObj } from "@storybook/react"
import { mockSponsors } from "@/mocks/Sponsor.mock"
import { SponsorsSection } from "./SponsorsSection"

const meta: Meta<typeof SponsorsSection> = {
  title: "Composite Components/SponsorsSection",
  component: SponsorsSection,
  argTypes: {
    sponsors: { control: "object" },
  },
  args: {
    sponsors: mockSponsors,
  },
}

export default meta
type Story = StoryObj<typeof SponsorsSection>

export const Primary: Story = {}
