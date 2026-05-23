import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { Radio } from "./Radio"

const OPTIONS = ["Option 1", "Option 2", "Option 3"]

const meta: Meta<typeof Radio> = {
  title: "Primitive Components/Radio",
  component: Radio,
  args: {
    label: "Label",
    options: OPTIONS,
    value: "",
    error: undefined,
  },
  argTypes: {
    label: { control: "text" },
    options: { control: "object" },
    error: { control: "text" },
    containerClassName: { control: "text" },
    required: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Radio>

export const Primary: Story = {
  render: (args) => {
    const [value, setValue] = useState("")
    return <Radio {...args} onChange={setValue} value={value} />
  },
}

export const WithPreselected: Story = {
  render: (args) => {
    const [value, setValue] = useState("Option 2")
    return <Radio {...args} onChange={setValue} value={value} />
  },
}

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState("")
    return <Radio {...args} error="Please select an option" onChange={setValue} value={value} />
  },
}

export const Toggleable: Story = {
  render: (args) => {
    const [value, setValue] = useState("Option 2")
    return (
      <Radio
        {...args}
        label="Preference"
        onChange={setValue}
        onSave={() => {}}
        toggleable
        value={value}
      />
    )
  },
}

export const ToggleableEditing: Story = {
  render: (args) => {
    const [value, setValue] = useState("Option 2")
    return (
      <Radio
        {...args}
        defaultToggleState
        label="Preference"
        onChange={setValue}
        onSave={() => {}}
        toggleable
        value={value}
      />
    )
  },
}
