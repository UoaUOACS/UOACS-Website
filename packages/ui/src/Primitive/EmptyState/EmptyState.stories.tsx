import { InboxIcon } from "@heroicons/react/24/outline"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Button } from "../Button/Button"
import { EmptyState } from "./EmptyState"
import { emptyStateVariants } from "./EmptyState.variants"

const meta: Meta<typeof EmptyState> = {
  title: "Primitive Components/EmptyState",
  component: EmptyState,
  args: {
    title: "No results found",
    description: "Try adjusting your search or filters.",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: emptyStateVariants.variants.size
        ? Object.keys(emptyStateVariants.variants.size)
        : [],
    },
    icon: { control: false },
    action: { control: false },
    children: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {}

export const WithIcon: Story = {
  args: {
    icon: <InboxIcon className="size-full" />,
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    title: undefined,
    description: "No upcoming events right now, check back soon.",
  },
}

export const WithAction: Story = {
  args: {
    icon: <InboxIcon className="size-full" />,
    title: "No events yet",
    description: "Check back soon or create the first one.",
    action: <Button theme="dark">Create Event</Button>,
  },
}
