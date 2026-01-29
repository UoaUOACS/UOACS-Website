import { Bars3Icon } from "@heroicons/react/24/solid"
import type { Meta, StoryObj } from "@storybook/react"
import { Dropdown } from "./Dropdown"

const meta: Meta<typeof Dropdown> = {
  title: "Primitive Components/Dropdown",
  component: Dropdown,
  argTypes: {
    label: { control: "text" },
    options: { control: "object" },
    triggerClassName: { control: "text" },
    popoverClassName: { control: "text" },
    triggerIcon: { control: false },
  },
  args: {
    label: "Socials",
    options: [
      {
        label: "Option 1",
        href: "#",
      },
      {
        label: "Option 2",
        href: "#",
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Primary: Story = {}

export const TriggerIcon: Story = {
  args: {
    triggerIcon: <Bars3Icon className="h-6 w-6 text-white" />,
  },
  argTypes: {
    triggerIcon: { control: false },
  },
}

export const LongOptions: Story = {
  args: {
    label: "Long Options",
    options: [
      {
        label: "This is a long option",
        href: "#",
      },
      { label: "Short one", href: "#" },
      {
        label: "Another long option",
        href: "#",
      },
    ],
  },
}

export const ManyOptions: Story = {
  args: {
    label: "Many Options",
    options: Array.from({ length: 10 }).map((_, i) => ({
      label: `Option ${i + 1}`,
      href: "#",
    })),
  },
}

export const IndividualOptionVariants: Story = {
  args: {
    label: "Rainbow",
    options: [
      { label: "Primary (Default)", href: "#" },
      { label: "Dark", href: "#", theme: "dark" },
      { label: "Light", href: "#", theme: "light" },
      { label: "Ghost", href: "#", theme: "ghost" },
    ],
  },
}
