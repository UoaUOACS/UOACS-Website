import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { EncryptedBanner, type EncryptedBannerProps } from "./EncryptedBanner"

const meta: Meta<EncryptedBannerProps> = {
  title: "Generic Components/EncryptedBanner",
  component: EncryptedBanner,
  args: { layers: 1 },
  argTypes: {
    layers: { control: { type: "select" }, options: [1, 2] },
    length: { control: { type: "number" } },
    colour: { control: { type: "select" }, options: ["pink", "orange", "purple", "blue"] },
    secondaryColour: { control: { type: "select" }, options: ["pink", "orange", "purple", "blue"] },
  },
}

export default meta
type Story = StoryObj<EncryptedBannerProps>

export const SingleLayer: Story = {}

export const DoubleLayer: Story = {
  args: { layers: 2 },
}
