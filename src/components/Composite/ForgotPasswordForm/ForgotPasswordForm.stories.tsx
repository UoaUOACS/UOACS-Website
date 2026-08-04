import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ForgotPasswordForm } from "./ForgotPasswordForm"

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Composite Components/ForgotPasswordForm",
  component: ForgotPasswordForm,
}

export default meta
type Story = StoryObj<typeof ForgotPasswordForm>

export const Default: Story = {}
