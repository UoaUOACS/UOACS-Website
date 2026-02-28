import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { Select } from "./Select"

const meta: Meta<typeof Select> = {
  title: "Primitive Components/Select",
  component: Select,
  args: {
    label: "Label",
    options: ["Option 1", "Option 2", "Option 3"],
    value: "",
    error: undefined,
    onChange: () => {},
  },
  argTypes: {
    label: { control: "text" },
    options: { control: "object" },
    error: { control: "text" },
    placeholder: { control: "text" },
    containerClassName: { control: "text" },
    required: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Primary: Story = {
  render: (args) => {
    const [value, setValue] = useState("")
    return <Select {...args} onChange={setValue} value={value} />
  },
}

export const WithPreselected: Story = {
  render: (args) => {
    const [value, setValue] = useState("Option 2")
    return <Select {...args} onChange={setValue} value={value} />
  },
}

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState("")
    return <Select {...args} error="Please select an option" onChange={setValue} value={value} />
  },
}

export const Required: Story = {
  render: (args) => {
    const [value, setValue] = useState("")
    return <Select {...args} onChange={setValue} required value={value} />
  },
}
