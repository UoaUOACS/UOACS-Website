import type { Meta, StoryFn } from "@storybook/react"
import { Polaroid } from "./Polaroid"

const meta: Meta<typeof Polaroid> = {
  title: "Generic Components/Polaroid",
  component: Polaroid,
  argTypes: {
    text: { control: "text" },
    url: { control: "text" },
    x_offset: { control: "number" },
    y_offset: { control: "number" },
    rotation: { control: "number" },
  },
  args: {
    text: "Pool Night",
    url: "media/Pool.jpeg",
    x_offset: 50,
    y_offset: 50,
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
          x_offset: 400,
          y_offset: 110,
          rotation: 12,
        }}
      />
      <Polaroid
        {...{
          text: "JoshLi because thats only other image here",
          url: "/media/JoshLi.jpeg",
          x_offset: 700,
          y_offset: 160,
          rotation: 45,
        }}
      />
    </div>
  )
}
