import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Skeleton } from "./Skeleton"
import { skeletonVariants } from "./Skeleton.variants"

const meta: Meta<typeof Skeleton> = {
  title: "Primitive Components/Skeleton",
  component: Skeleton,
  argTypes: {
    shape: {
      control: { type: "select" },
      options: skeletonVariants.variants.shape ? Object.keys(skeletonVariants.variants.shape) : [],
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    shape: "rect",
  },
}

export const Text: Story = {
  render: () => (
    <div aria-busy="true" className="flex flex-col gap-2">
      <Skeleton className="heading-4 w-1/2" shape="text" />
      <Skeleton className="paragraph" shape="text" />
      <Skeleton className="paragraph" shape="text" />
      <Skeleton className="paragraph w-2/3" shape="text" />
    </div>
  ),
}

export const Circle: Story = {
  args: {
    shape: "circle",
  },
}

export const Composed: Story = {
  render: () => (
    <div
      aria-busy="true"
      className="flex w-80 flex-col gap-4 rounded-2xl border border-gray-200 p-4"
    >
      <div className="flex flex-row items-center gap-3">
        <Skeleton shape="circle" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="heading-4 w-2/3" shape="text" />
          <Skeleton className="paragraph-sm w-1/3" shape="text" />
        </div>
      </div>
      <Skeleton className="h-40" />
    </div>
  ),
}
