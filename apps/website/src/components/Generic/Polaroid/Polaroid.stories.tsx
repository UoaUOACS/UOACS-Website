import type { Meta, StoryFn } from "@storybook/nextjs-vite"
import { Polaroid } from "./Polaroid"

const meta: Meta<typeof Polaroid> = {
  title: "Generic Components/Polaroid",
  component: Polaroid,
  argTypes: {
    text: { control: "text" },
    url: { control: "text" },
    xOffset: { control: "number" },
    yOffset: { control: "number" },
    rotation: { control: "number" },
  },
  args: {
    text: "Pool Night",
    url: "media/Pool.jpeg",
    xOffset: 50,
    yOffset: 50,
    rotation: 0,
  },
}

export default meta
type Story = StoryFn<typeof Polaroid>

export const Default: Story = (args) => <Polaroid {...args} />

export const Multiple: Story = (args) => {
  return (
    <div>
      <Polaroid {...args} />
      <Polaroid
        {...{
          text: "Pool Night 2 electric Bogaloo",
          url: "/media/Pool.jpeg",
          xOffset: 400,
          yOffset: 110,
          rotation: 12,
        }}
      />
      <Polaroid
        {...{
          text: "JoshLi because thats only other image here",
          url: "/media/JoshLi.jpeg",
          xOffset: 700,
          yOffset: 160,
          rotation: 45,
        }}
      />
    </div>
  )
}
