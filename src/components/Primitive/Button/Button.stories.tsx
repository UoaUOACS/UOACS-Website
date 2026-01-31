import { Bars3Icon } from "@heroicons/react/24/solid"
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"
import { buttonVariants } from "./variants"

const meta: Meta<typeof Button> = {
  title: "Primitive Components/Button",
  component: Button,
  args: {
    children: "Button Type 2",
    theme: "primary",
  },
  argTypes: {
    theme: {
      control: { type: "select" },
      options: buttonVariants.variants.theme ? Object.keys(buttonVariants.variants.theme) : [],
    },
    left: { control: { type: "text" } },
    right: { control: { type: "text" } },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {}

export const RightIcon: Story = {
  args: {
    right: <Bars3Icon className="h-6 w-6 text-white" />,
  },
  argTypes: {
    right: { control: false },
  },
}

export const LeftIcon: Story = {
  args: {
    left: <Bars3Icon className="h-6 w-6 text-white" />,
  },
  argTypes: {
    left: { control: false },
  },
}

export const Ghost: Story = {
  args: {
    theme: "ghost",
    children: "Ghost Button",
  },
}

export const Dark: Story = {
  args: {
    theme: "dark",
    children: "Dark Button",
  },
}

export const Light: Story = {
  args: {
    theme: "light",
    children: "Light Button",
  },
}
