import type { Meta, StoryObj } from "@storybook/nextjs-vite"
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
      <div style={{ background: "#FF307C" }}>
        <Story />
      </div>
    ),
  ],
}

export const Regular: Story = {
  decorators: [
    (Story) => (
      <div style={{ background: "linear-gradient(to right, transparent 50%, #FF307C 50%)" }}>
        <Story />
      </div>
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
