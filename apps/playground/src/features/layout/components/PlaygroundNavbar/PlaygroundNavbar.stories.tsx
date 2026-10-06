import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SessionProvider } from "@/features/user/context/SessionContext"
import { PlaygroundNavbar } from "./PlaygroundNavbar"

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
    signedIn: { control: "boolean" },
    logoHref: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof PlaygroundNavbar>

export const Home: Story = {
  decorators: [
    (Story) => (
      <SessionProvider>
        <Story />
      </SessionProvider>
    ),
  ],
}

export const Regular: Story = {
  decorators: [
    (Story) => (
      <SessionProvider>
        <Story />
      </SessionProvider>
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
