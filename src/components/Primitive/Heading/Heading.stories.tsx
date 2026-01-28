import type { Meta, StoryFn } from "@storybook/react"
import { Heading } from "./Heading"

const meta: Meta<typeof Heading> = {
  title: "Primitive Components/Heading",
  component: Heading,
  argTypes: {
    h: { control: "select", options: [1, 2, 3, 4, 5, 6] },
    children: { control: "text" },
    period: { control: "boolean" },
    className: { control: "text" },
    periodClassName: { control: "text" },
  },
  args: {
    h: 1,
    children: "Who We Are",
    period: false,
  },
}

export default meta

type Story = StoryFn<typeof Heading>

export const Basic: Story = (args) => <Heading {...args} />

export const Headings: Story = (args) => {
  return (
    <div className="flex flex-col gap-1">
      <Heading {...args} h={1} />
      <Heading {...args} h={2} />
      <Heading {...args} h={3} />
    </div>
  )
}

export const HeadingsWithPeriod: Story = (args) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading {...args} h={1} period />
      <Heading {...args} h={2} period />
      <Heading {...args} h={3} period />
    </div>
  )
}
