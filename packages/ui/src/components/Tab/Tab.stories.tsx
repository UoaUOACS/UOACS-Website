import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useRef, useState } from "react"
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

/** A minimal tablist: owns the active index, and moves focus + selection together on arrow keys. */
const TabRow = ({ labels }: { labels: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const selectTab = (index: number) => {
    const nextIndex = (index + labels.length) % labels.length
    setActiveIndex(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "ArrowRight") selectTab(index + 1)
    if (event.key === "ArrowLeft") selectTab(index - 1)
  }

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
            onClick={() => selectTab(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
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

    await userEvent.keyboard("{ArrowRight}")

    await expect(tabs[3]).toHaveFocus()
    await expect(tabs[3]).toHaveAttribute("aria-selected", "true")
    await expect(tabs[2]).toHaveAttribute("aria-selected", "false")
  },
}

export const Interaction: Story = {
  args: {
    active: false,
    "aria-controls": "panel-featured",
    "aria-selected": false,
    children: "Featured",
    id: "tab-featured",
    role: "tab",
    tabIndex: 0,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const tab = canvas.getByRole("tab", { name: "Featured" })

    await expect(tab).toHaveAttribute("id", "tab-featured")
    await expect(tab).toHaveAttribute("aria-controls", "panel-featured")
    await expect(tab).toHaveAttribute("aria-selected", "false")
    await expect(tab).toHaveAttribute("tabindex", "0")

    await userEvent.click(tab)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}
