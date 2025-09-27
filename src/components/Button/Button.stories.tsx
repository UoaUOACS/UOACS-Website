import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./Button"

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: { label: { control: "text" } },
  args: {
    label: "Click Me",
  },
}

export default meta

export const Basic: Story = {
  args: {},
}
