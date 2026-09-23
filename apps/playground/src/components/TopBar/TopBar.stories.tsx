import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { ProfileBackdrop } from "@/features/profile/components"
import { TopBar } from "./TopBar"

const meta: Meta<typeof TopBar> = {
  title: "Components/TopBar",
  component: TopBar,
  args: { onCreate: fn(), onProfile: fn() },
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="relative w-full bg-white pb-16">
        <ProfileBackdrop />
        <div className="relative z-10">
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TopBar>

export const Default: Story = {}

/** Guards the layout on small screens, where the gutters tighten. */
export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
}

/** Both actions report back to whatever owns the routing. */
export const TriggersActions: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole("button", { name: "Create" }))
    await userEvent.click(canvas.getByRole("button", { name: "Profile" }))

    await expect(args.onCreate).toHaveBeenCalledTimes(1)
    await expect(args.onProfile).toHaveBeenCalledTimes(1)
  },
}
