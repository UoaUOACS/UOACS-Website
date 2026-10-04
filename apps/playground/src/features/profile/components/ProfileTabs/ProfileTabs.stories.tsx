import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"
import { ProfileTabs } from "./ProfileTabs"

const meta = {
  title: "Profile/ProfileTabs",
  component: ProfileTabs,
  args: {
    panels: { Projects: <p>Projects panel</p>, About: <p>About panel</p> },
  },
} satisfies Meta<typeof ProfileTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SwitchesTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("tab", { name: "About" }))
    await expect(canvas.getByRole("tab", { name: "About" })).toHaveAttribute(
      "aria-selected",
      "true",
    )
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("About panel")
  },
}
