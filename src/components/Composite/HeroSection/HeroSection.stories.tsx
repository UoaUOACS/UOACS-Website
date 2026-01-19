import type { Meta, StoryObj } from "@storybook/react"
import { HeroSection } from "./HeroSection"

const meta: Meta<typeof HeroSection> = {
  title: "Composite Components/HeroSection",
  component: HeroSection,
}

export default meta
type Story = StoryObj<typeof HeroSection>

export const Default: Story = {}
