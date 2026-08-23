import type { Meta, StoryFn } from "@storybook/nextjs-vite"
import { useState } from "react"
import { PinInput } from "./PinInput"

const meta: Meta<typeof PinInput> = {
  title: "Primitive Components/PinInput",
  component: PinInput,
  args: {
    label: "Verification Code",
    value: "",
    onChange: () => {},
    error: undefined,
    length: 6,
  },
  argTypes: {
    label: { control: "text" },
    error: { control: "text" },
    length: { control: "number" },
    containerClassName: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryFn<typeof PinInput>

export const Primary: Story = (args) => {
  const [value, setValue] = useState("")
  return <PinInput {...args} onChange={setValue} value={value} />
}

export const WithError: Story = (args) => {
  const [value, setValue] = useState("")
  return <PinInput {...args} error="Invalid verification code" onChange={setValue} value={value} />
}

export const Required: Story = (args) => {
  const [value, setValue] = useState("")
  return <PinInput {...args} onChange={setValue} required value={value} />
}

export const Disabled: Story = (args) => {
  const [value, setValue] = useState("")
  return <PinInput {...args} disabled onChange={setValue} value={value} />
}

export const FourDigit: Story = (args) => {
  const [value, setValue] = useState("")
  return <PinInput {...args} length={4} onChange={setValue} value={value} />
}
