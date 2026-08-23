import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { MultiSelect } from "./MultiSelect"

const OPTIONS = ["Computer Science", "Engineering", "Mathematics", "Physics", "Other"]

const meta: Meta<typeof MultiSelect> = {
  title: "Primitive Components/MultiSelect",
  component: MultiSelect,
  args: {
    label: "Label",
    options: OPTIONS,
    value: [],
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
type Story = StoryObj<typeof MultiSelect>

export const Primary: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([])
    return <MultiSelect {...args} onChange={setValue} value={value} />
  },
}

export const WithPreselected: Story = {
  render: (args) => {
    const [value, setValue] = useState(["Computer Science", "Mathematics"])
    return <MultiSelect {...args} onChange={setValue} value={value} />
  },
}

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([])
    return (
      <MultiSelect
        {...args}
        error="Please select at least one major"
        onChange={setValue}
        value={value}
      />
    )
  },
}

export const Required: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([])
    return <MultiSelect {...args} onChange={setValue} required value={value} />
  },
}

export const WithCustomTextInput: Story = {
  render: (args) => {
    const [value, setValue] = useState<string[]>([])
    return <MultiSelect {...args} customTextInput onChange={setValue} value={value} />
  },
}
