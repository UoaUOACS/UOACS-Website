import type { Meta, StoryFn } from "@storybook/nextjs-vite"
import { mockReel } from "@/mocks/Reel.mock"
import { AboutUsSection } from "./AboutUsSection"

const meta: Meta<typeof AboutUsSection> = {
  title: "Composite Components/AboutUsSection",
  component: AboutUsSection,
  args: {
    reels: [mockReel, mockReel],
    instagramHref: "https://www.instagram.com/uoacs25/",
  },
}

export default meta
type Story = StoryFn<typeof AboutUsSection>

export const Default: Story = (args) => {
  return (
    <div className="mt-55">
      <AboutUsSection {...args} />
    </div>
  )
}
