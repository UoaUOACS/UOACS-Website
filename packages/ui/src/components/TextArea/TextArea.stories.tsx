import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TextArea } from "./TextArea"

const meta: Meta<typeof TextArea> = {
  title: "Primitive Components/TextArea",
  component: TextArea,
  args: {
    label: "Label",
    placeholder: "Enter your text here...",
    error: undefined,
  },
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    containerClassName: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    resize: { control: "select", options: ["vertical", "none"] },
  },
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Primary: Story = {}

export const WithoutLabel: Story = {
  args: {
    label: undefined,
  },
}

export const WithHint: Story = {
  args: {
    hint: "A sentence or two about your project.",
  },
}

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

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Can't edit this",
  },
}

export const WithMaxLength: Story = {
  args: {
    maxLength: 50,
    placeholder: "Max 50 characters...",
  },
}

export const ResizeNone: Story = {
  args: {
    resize: "none",
    placeholder: "Not resizable...",
  },
}
