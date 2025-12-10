import type { Meta, StoryObj } from "@storybook/react"
import { Dropdown } from "./Dropdown"

const meta: Meta<typeof Dropdown> = {
  title: "Primitive Components/Dropdown",
  component: Dropdown,
  argTypes: {
    label: { control: "text" },
    options: { control: "object" },
    variant: {
      control: "object",
      description: "Variant configuration for theme, size",
    },
    optionVariant: {
      control: "object",
      description: "Variant configuration for options",
    },
  },
  args: {
    label: "SOCIALS",
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

export const Primary: Story = {
  args: {
    variant: { theme: "primary", size: "md" },
  },
}

export const MismatchedVariants: Story = {
  args: {
    variant: { theme: "primary", size: "md" },
    optionVariant: { theme: "secondary" },
    label: "MIXED THEME",
  },
}

export const LongOptions: Story = {
  args: {
    variant: { theme: "primary", size: "md" },
    label: "LONG OPTIONS",
    options: [
      {
        label: "This is a very long option that should expand the dropdown",
        href: "#",
      },
      { label: "Short one", href: "#" },
      {
        label: "Another significantly lengthy option for testing purposes",
        href: "#",
      },
    ],
  },
}

export const ManyOptions: Story = {
  args: {
    variant: { theme: "primary", size: "md" },
    label: "MANY OPTIONS",
    options: Array.from({ length: 10 }).map((_, i) => ({
      label: `Option ${i + 1}`,
      href: "#",
    })),
  },
}

export const IndividualOptionVariants: Story = {
  args: {
    variant: { theme: "primary", size: "md" },
    label: "RAINBOW",
    options: [
      { label: "Primary (Default)", href: "#" },
      { label: "Secondary", href: "#", variant: { theme: "secondary" } },
      { label: "Dark", href: "#", variant: { theme: "dark" } },
      { label: "Light", href: "#", variant: { theme: "light" } },
      { label: "Ghost", href: "#", variant: { theme: "ghost" } },
    ],
  },
}
