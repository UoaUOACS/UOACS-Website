import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { expect, fn, userEvent, within } from "storybook/test"
import { cn } from "../../utils"
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
    first: true,
  },
}

export const Inactive: Story = {
  args: {
    active: false,
    children: "Awards",
    first: false,
  },
}

export const Overlapping: Story = {
  render: (args) => (
    <div className="flex bg-gray-100 p-8">
      <Tab {...args} active className="z-20 -mr-12" first>
        Featured
      </Tab>
      <Tab {...args} active={false} className="z-0" first={false}>
        Awards
      </Tab>
    </div>
  ),
}

/**
 * A minimal tablist, showing what a consumer of `Tab` is responsible for: holding
 * the active index, and raising the active tab above the ones tucked under it.
 */
const TabRow = ({ labels }: { labels: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="flex bg-gray-100 p-8" role="tablist">
      {labels.map((label, index) => {
        const isActive = index === activeIndex

        return (
          <Tab
            active={isActive}
            aria-selected={isActive}
            // The negative margin slides each tab's slant under its neighbour.
            className={cn(index > 0 && "-ml-12", isActive ? "z-20" : "z-0")}
            first={index === 0}
            key={label}
            onClick={() => setActiveIndex(index)}
            role="tab"
            tabIndex={isActive ? 0 : -1}
          >
            {label}
          </Tab>
        )
      })}
    </div>
  )
}

export const Switching: StoryObj<{ labels: string[] }> = {
  args: {
    labels: ["Featured", "Awards", "Events", "Sponsors"],
  },
  render: ({ labels }) => <TabRow labels={labels} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tabs = canvas.getAllByRole("tab")

    await expect(tabs).toHaveLength(4)
    await expect(tabs[0]).toHaveAttribute("aria-selected", "true")

    await userEvent.click(tabs[2])

    for (const [index, tab] of tabs.entries()) {
      await expect(tab).toHaveAttribute("aria-selected", String(index === 2))
    }
  },
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
