import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { mockProfileTabs } from "@/mocks/Profile.mock"
import { ProfileTabs } from "./ProfileTabs"

const meta: Meta<typeof ProfileTabs> = {
  title: "Features/Profile/ProfileTabs",
  component: ProfileTabs,
  args: { tabs: mockProfileTabs, onValueChange: fn() },
}

export default meta
type Story = StoryObj<typeof ProfileTabs>

export const Default: Story = {}

/** The first tab is selected unless `defaultValue` says otherwise. */
export const SecondTabSelected: Story = { args: { defaultValue: "awards" } }

export const ManyCollections: Story = {
  args: {
    tabs: [
      { id: "projects", label: "Projects", count: 8 },
      { id: "awards", label: "Awards", count: 0 },
      { id: "drafts", label: "Drafts", count: 12 },
    ],
  },
}

/** Clicking a tab selects it and reports the change. */
export const SelectsOnClick: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const awards = canvas.getByRole("tab", { name: /awards/i })

    await userEvent.click(awards)

    await expect(awards).toHaveAttribute("aria-selected", "true")
    await expect(args.onValueChange).toHaveBeenCalledWith("awards")
  },
}

/** Arrow keys move the selection, per the ARIA tabs pattern. */
export const SelectsWithArrowKeys: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const projects = canvas.getByRole("tab", { name: /projects/i })
    const awards = canvas.getByRole("tab", { name: /awards/i })

    projects.focus()
    await userEvent.keyboard("{ArrowRight}")

    await expect(awards).toHaveAttribute("aria-selected", "true")
    await expect(awards).toHaveFocus()
    await expect(args.onValueChange).toHaveBeenCalledWith("awards")

    await userEvent.keyboard("{ArrowRight}")

    await expect(projects).toHaveAttribute("aria-selected", "true")
  },
}
