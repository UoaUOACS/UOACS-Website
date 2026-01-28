import { faDiscord } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { Meta, StoryObj } from "@storybook/react"
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
    children: <FontAwesomeIcon fontSize={32} icon={faDiscord} />,
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
    left: <FontAwesomeIcon fontSize={18} icon={faDiscord} />,
    variant: { border: true, size: "md", theme: "primary" },
  },
}

export const RightIcon: Story = {
  args: {
    children: "JOIN US ON DISCORD",
    right: <FontAwesomeIcon fontSize={18} icon={faDiscord} />,
    variant: { border: true, size: "md", theme: "primary" },
  },
}
