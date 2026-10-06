import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { type Session, SessionContext } from "@/features/user/context/SessionContext"
import { PlaygroundNavbar } from "./PlaygroundNavbar"

const mockSession: Session = {
  user: {
    id: "usr_01j8x9k2mgqf5s0y7c3n4h8v6z",
    createdAt: new Date("2026-01-15T10:00:00Z"),
    updatedAt: new Date("2026-01-15T10:00:00Z"),
    email: "test@uoacs.example.com",
    emailVerified: true,
    name: "Jane Doe",
    image: null,
  },
  session: {
    id: "ses_01j8xa1p3wqf6t1z8d4o5j9w7a",
    createdAt: new Date("2026-07-23T09:00:00Z"),
    updatedAt: new Date("2026-07-23T09:00:00Z"),
    userId: "usr_01j8x9k2mgqf5s0y7c3n4h8v6z",
    expiresAt: new Date("2026-08-06T09:00:00Z"),
    token: "mock-session-token",
    ipAddress: "127.0.0.1",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  },
}

const meta: Meta<typeof PlaygroundNavbar> = {
  title: "Features/Layout/PlaygroundNavbar",
  component: PlaygroundNavbar,
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
  argTypes: {
    logoHref: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof PlaygroundNavbar>

export const Home: Story = {
  decorators: [
    (Story) => (
      <SessionContext.Provider value={null}>
        <Story />
      </SessionContext.Provider>
    ),
  ],
}

export const Regular: Story = {
  decorators: [
    (Story) => (
      <SessionContext.Provider value={null}>
        <Story />
      </SessionContext.Provider>
    ),
  ],
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/events",
      },
    },
  },
}

export const SignedIn: Story = {
  decorators: [
    (Story) => (
      <SessionContext.Provider value={mockSession}>
        <Story />
      </SessionContext.Provider>
    ),
  ],
}
