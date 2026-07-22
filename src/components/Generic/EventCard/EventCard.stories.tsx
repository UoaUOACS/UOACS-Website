import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { mockPastEvent, mockUpcomingEvent, mockUpcomingEventWithSignUp } from "@/mocks/Event.mock"
import { EventCard, type EventCardProps } from "./EventCard"

const meta: Meta<EventCardProps> = {
  title: "Generic Components/EventCard",
  component: EventCard,
  argTypes: { event: { control: "object" } },
}

export default meta
type Story = StoryObj<EventCardProps>

export const PastEvent: Story = {
  args: {
    event: mockPastEvent,
  },
}

export const UpcomingEvent: Story = {
  args: {
    event: mockUpcomingEvent,
  },
}

export const UpcomingEventWithSignUp: Story = {
  args: {
    event: mockUpcomingEventWithSignUp,
  },
}
