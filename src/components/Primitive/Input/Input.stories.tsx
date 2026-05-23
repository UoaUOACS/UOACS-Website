import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
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

export const Toggleable: Story = {
  render: (args) => {
    const [value, setValue] = useState("John Doe")
    return (
      <Input
        {...args}
        label="Full Name"
        onChange={(e) => setValue(e.target.value)}
        onSave={() => {}}
        toggleable
        value={value}
      />
    )
  },
}

export const ToggleableEditing: Story = {
  render: (args) => {
    const [value, setValue] = useState("John Doe")
    return (
      <Input
        {...args}
        defaultToggleState
        label="Full Name"
        onChange={(e) => setValue(e.target.value)}
        onSave={() => {}}
        toggleable
        value={value}
      />
    )
  },
}
