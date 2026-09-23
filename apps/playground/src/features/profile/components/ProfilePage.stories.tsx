import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { EmptyState } from "@uoacs/ui"
import { expect, fn, userEvent, within } from "storybook/test"
import { mockProfile, mockProfileTabs } from "@/mocks/Profile.mock"
import { ProfileBackdrop } from "./ProfileBackdrop"
import { ProfilePage } from "./ProfilePage"

const meta: Meta<typeof ProfilePage> = {
  title: "Features/Profile/ProfilePage",
  component: ProfilePage,
  args: {
    profile: mockProfile,
    tabs: mockProfileTabs,
    onEditProfile: fn(),
    onFilter: fn(),
    onShare: fn(),
    onTabChange: fn(),
  },
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="relative flex w-full flex-col bg-white px-4 py-10 md:px-12">
        <ProfileBackdrop />
        <div className="relative z-10 flex flex-col">
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProfilePage>

export const Default: Story = {}

/** The tab panel is a slot: whatever renders a collection goes here. */
export const WithPanelContent: Story = {
  args: {
    children: (
      <EmptyState
        description="Project cards are handled separately; this panel is where they land."
        title="Nothing here yet"
      />
    ),
  },
}

/** Guards the stacked layout on small screens. */
export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div className="w-[380px]">
        <Story />
      </div>
    ),
  ],
}

/** Switching collections relabels the panel the tabs control. */
export const SwitchesCollections: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const awards = canvas.getByRole("tab", { name: /awards/i })

    await userEvent.click(awards)

    await expect(args.onTabChange).toHaveBeenCalledWith("awards")
    await expect(canvas.getByRole("tabpanel", { name: "Awards" })).toBeInTheDocument()
    await expect(awards).toHaveAttribute("aria-controls", "profile-tab-panel")
  },
}
