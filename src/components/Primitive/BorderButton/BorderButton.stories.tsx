import type { Meta, StoryObj } from "@storybook/react"
import { SocialIcon } from "../Icons"
import { BorderButton } from "./BorderButton"

type Story = StoryObj<typeof BorderButton>

const meta: Meta<typeof BorderButton> = {
  title: "Primitive Components/BorderButton",
  component: BorderButton,
  argTypes: {
    children: { control: "text" },
    variant: { control: "object" },
    className: { control: "text" },
    borderClassName: { control: "text" },
    type: { control: "select", options: ["button", "submit", "reset"] },
    left: { control: false },
    right: { control: false },
  },
  args: {
    children: "INTERESTED? JOIN US",
    variant: { border: true, size: "md", theme: "dark" },
  },
}

export default meta

export const Basic: Story = {
  args: {},
}

export const IconButton: Story = {
  args: {
    children: <SocialIcon.Discord className="h-8 w-8" />,
    variant: { border: true, size: "sm", theme: "primary" },
  },
  argTypes: {
    children: { control: false },
  },
}

export const Borderless: Story = {
  args: {
    children: "NO BORDER BUTTON",
    variant: { border: false, size: "md", theme: "dark" },
  },
}

export const LeftIcon: Story = {
  args: {
    children: "JOIN US ON DISCORD",
    left: <SocialIcon.Discord className="h-4 w-4" />,
    variant: { border: true, size: "md", theme: "primary" },
  },
}

export const RightIcon: Story = {
  args: {
    children: "JOIN US ON DISCORD",
    right: <SocialIcon.Discord className="h-4 w-4" />,
    variant: { border: true, size: "md", theme: "primary" },
  },
}
