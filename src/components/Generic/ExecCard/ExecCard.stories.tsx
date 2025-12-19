import type { Meta, StoryObj } from "@storybook/react"
import { mockExecutive, mockExecutiveWithPhoto } from "@/mocks/Executive.mock"
import { ExecCard, type ExecCardProps } from "./ExecCard"

const meta: Meta<ExecCardProps> = {
  title: "Generic Components/ExecCard",
  component: ExecCard,
  argTypes: { exec: { control: "object" } },
  args: {
    exec: mockExecutiveWithPhoto,
  },
}

export default meta
type Story = StoryObj<ExecCardProps>

export const Default: Story = {}

export const Fallback: Story = {
  args: {
    exec: mockExecutive,
  },
}
