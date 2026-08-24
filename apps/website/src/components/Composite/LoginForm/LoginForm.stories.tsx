import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LoginForm } from "./LoginForm"

const meta: Meta<typeof LoginForm> = {
  title: "Composite Components/LoginForm",
  component: LoginForm,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {}
