import type { Meta, StoryFn } from "@storybook/nextjs-vite"
import { mockReel } from "@/mocks/Reel.mock"
import { Reel } from "./Reel"

const meta: Meta<typeof Reel> = {
  title: "Composite Components/Reel",
  component: Reel,
  argTypes: {
    reel: { control: "object" },
  },
  args: {
    reel: mockReel,
  },
}

export default meta
type Story = StoryFn<typeof Reel>

export const Primary: Story = (args) => {
  return (
    <div className="w-80">
      <Reel {...args} />
    </div>
  )
}

export const LongDescription: Story = ({ reel }) => {
  const longDescriptionReel = {
    ...reel,
    description:
      "you should 100% join uoacs if you're cool you should 100% join uoacs if you're cool you should 100% join uoacs if you're cool you should 100% join uoacs if you're cool you should 100% join uoacs if you're cool you should 100% join uoacs if you're cool you should 100% join uoacs if you're cool",
  }

  return (
    <div className="w-80">
      <Reel reel={longDescriptionReel} />
    </div>
  )
}

export const Small: Story = (args) => {
  return (
    <div className="w-64">
      <Reel {...args} />
    </div>
  )
}

export const Large: Story = (args) => {
  return (
    <div className="w-96">
      <Reel {...args} />
    </div>
  )
}
