import type { Meta, StoryObj } from "@storybook/nextjs-vite"
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
