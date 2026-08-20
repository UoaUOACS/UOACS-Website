import type { Meta, StoryFn, StoryObj } from "@storybook/nextjs-vite"
import { Toast } from "./Toast"

const meta: Meta<typeof Toast> = {
  title: "Primitive Components/Toast",
  component: Toast,
  args: {
    type: "success",
    description: "This is a description for the toast notification.",
  },
  argTypes: {
    description: { control: { type: "text" } },
  },
}

export default meta
type StoryObject = StoryObj<typeof Toast>
type StoryFunction = StoryFn<typeof Toast>

export const Primary: StoryObject = {}

export const WithLongDescription: StoryObject = {
  args: {
    description:
      "This is a longer description for the toast notification. It can span multiple lines and provide more detailed information to the user.",
  },
}

export const Variants: StoryFunction = (args) => (
  <div className="flex flex-col gap-4">
    <Toast {...args} description="This is a success toast notification." type="success" />
    <Toast {...args} description="This is a warning toast notification." type="warning" />
    <Toast {...args} description="This is an error toast notification." type="error" />
  </div>
)
