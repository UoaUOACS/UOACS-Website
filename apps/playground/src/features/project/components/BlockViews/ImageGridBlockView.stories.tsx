import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import type { GalleryImage } from "@uoacs/ui"
import { ImageGridBlockView } from "./ImageGridBlockView"

const images = (count: number): GalleryImage[] =>
  Array.from({ length: count }, (_, index) => ({
    id: String(index),
    src: `https://placehold.co/1920x1080?text=${index + 1}`,
    alt: `Image ${index + 1}`,
    width: 1920,
    height: 1080,
  }))

const meta = {
  title: "Project/Blocks/ImageGridBlockView",
  component: ImageGridBlockView,
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-5xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageGridBlockView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { images: images(3) },
}

export const OneImage: Story = {
  args: { images: images(1) },
}

export const ManyImages: Story = {
  args: { images: images(12) },
}

export const Compact: Story = {
  args: { images: images(2), compact: true },
}

export const CompactManyImages: Story = {
  args: { images: images(12), compact: true },
}
