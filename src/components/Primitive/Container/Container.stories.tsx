import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Container } from "./Container"
import { containerVariants } from "./Container.variants"

const meta: Meta<typeof Container> = {
  title: "Primitive Components/Container",
  component: Container,
  argTypes: {
    children: { control: false },
    theme: {
      control: { type: "select" },
      options: containerVariants.variants.theme
        ? Object.keys(containerVariants.variants.theme)
        : [],
    },
  },
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    children: <div className="px-6 py-6">This is a container</div>,
    title: "Container Title",
  },
}
