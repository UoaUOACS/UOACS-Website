import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useSearchParams } from "@storybook/nextjs-vite/navigation.mock"
import type { ReadonlyURLSearchParams } from "next/navigation"
import { ResetPasswordForm } from "./ResetPasswordForm"

const meta: Meta<typeof ResetPasswordForm> = {
  title: "Composite Components/ResetPasswordForm",
  component: ResetPasswordForm,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof ResetPasswordForm>

const asSearchParams = (params: URLSearchParams) => params as unknown as ReadonlyURLSearchParams

export const WithToken: Story = {
  beforeEach: () => {
    useSearchParams.mockReturnValue(asSearchParams(new URLSearchParams({ token: "example-token" })))
  },
}

export const MissingToken: Story = {
  beforeEach: () => {
    useSearchParams.mockReturnValue(asSearchParams(new URLSearchParams()))
  },
}

export const InvalidToken: Story = {
  beforeEach: () => {
    useSearchParams.mockReturnValue(asSearchParams(new URLSearchParams({ error: "INVALID_TOKEN" })))
  },
}
