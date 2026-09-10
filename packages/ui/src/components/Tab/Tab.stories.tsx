import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Tab } from "./Tab"

const meta: Meta<typeof Tab> = {
  title: "Primitive Components/Tab",
  component: Tab,
  args: {
    onClick: fn(),
  },
}

export default meta
type Story = StoryObj<typeof Tab>

export const Active: Story = {
  args: {
    active: true,
    children: "Featured",
  },
}

export const Inactive: Story = {
  args: {
    active: false,
    children: "Awards",
  },
}

export const Overlapping: Story = {
  render: (args) => (
    <div className="flex bg-primary p-8">
      <Tab {...args} active className="-mr-4">
        Featured
      </Tab>
      <Tab {...args} active={false}>
        Awards
      </Tab>
    </div>
  ),
}

export const Interaction: Story = {
  args: {
    active: false,
    "aria-controls": "panel-featured",
    "aria-selected": false,
    children: "Featured",
    id: "tab-featured",
    tabIndex: 0,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Featured" })

    await expect(button).toHaveAttribute("id", "tab-featured")
    await expect(button).toHaveAttribute("aria-controls", "panel-featured")
    await expect(button).toHaveAttribute("aria-selected", "false")
    await expect(button).toHaveAttribute("tabindex", "0")

    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}
