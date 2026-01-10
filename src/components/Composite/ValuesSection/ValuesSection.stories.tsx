import type { Meta, StoryObj } from "@storybook/react"
import { ValuesSection } from "./ValuesSection"

const meta: Meta<typeof ValuesSection> = {
  title: "Composite Components/ValuesSection",
  component: ValuesSection,
}

export default meta

type Story = StoryObj<typeof ValuesSection>

export const Default: Story = {
  args: {},
}
