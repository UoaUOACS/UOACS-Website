import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { mockProfileTabs } from "@/mocks/Profile.mock"
import { ProfileTabs } from "./ProfileTabs"
import { ProfileToolbar } from "./ProfileToolbar"

const meta: Meta<typeof ProfileToolbar> = {
  title: "Features/Profile/ProfileToolbar",
  component: ProfileToolbar,
  args: {
    children: <ProfileTabs tabs={mockProfileTabs} />,
    onEditProfile: fn(),
    onFilter: fn(),
    onShare: fn(),
  },
}

export default meta
type Story = StoryObj<typeof ProfileToolbar>

export const Default: Story = {}

/** The centre slot is optional, e.g. on someone else's profile. */
export const WithoutTabs: Story = { args: { children: undefined } }

/** Guards the single-column layout on small screens. */
export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
}

/** Every action reports back to the page that owns the behaviour. */
export const TriggersActions: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole("button", { name: "Edit Profile" }))
    await userEvent.click(canvas.getByRole("button", { name: "Filter" }))
    await userEvent.click(canvas.getByRole("button", { name: "Share profile" }))

    await expect(args.onEditProfile).toHaveBeenCalledTimes(1)
    await expect(args.onFilter).toHaveBeenCalledTimes(1)
    await expect(args.onShare).toHaveBeenCalledTimes(1)
  },
}
