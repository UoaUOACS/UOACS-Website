import type { Meta, StoryObj } from "@storybook/react"
import { ValuesCarousel } from "./ValuesCarousel"

const meta: Meta<typeof ValuesCarousel> = {
  title: "Composite Components/ValuesCarousel",
  component: ValuesCarousel,
}

export default meta

type Story = StoryObj<typeof ValuesCarousel>

export const Default: Story = {
  args: {},
}
