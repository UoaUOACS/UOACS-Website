import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SearchBar } from "./SearchBar"

const meta: Meta<typeof SearchBar> = {
  title: "Features/Search/SearchBar",
  component: SearchBar,
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const Default: Story = {}

export const WithValue: Story = { args: { defaultValue: "hackathon" } }

/** Guards the "usable down to 360px" criterion. */
export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
}
