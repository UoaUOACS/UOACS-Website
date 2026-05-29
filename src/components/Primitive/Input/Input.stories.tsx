import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Input } from "./Input"

const meta: Meta<typeof Input> = {
  title: "Primitive Components/Input",
  component: Input,
  args: {
    label: "Label",
    type: "text",
    error: undefined,
  },
  argTypes: {
    label: { control: "text" },
    type: { control: "text" },
    error: { control: "text" },
    containerClassName: { control: "text" },
    required: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Primary: Story = {}

export const WithError: Story = {
  args: {
    error: "This field is required",
  },
}

export const Required: Story = {
  args: {
    required: true,
  },
}

export const Email: Story = {
  args: {
    label: "Email",
    type: "email",
  },
}
