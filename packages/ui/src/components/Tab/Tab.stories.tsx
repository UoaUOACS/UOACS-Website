import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Tab } from "./Tab"

const meta: Meta<typeof Tab> = {
  title: "Primitive Components/Tab",
  component: Tab,
}

export default meta
type Story = StoryObj<typeof Tab>

export const Default: Story = {}
