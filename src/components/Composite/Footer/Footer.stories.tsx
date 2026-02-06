import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Footer } from "./Footer"

const meta: Meta<typeof Footer> = {
  title: "Composite Components/Footer",
  component: Footer,
}

export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {
  args: {},
}
