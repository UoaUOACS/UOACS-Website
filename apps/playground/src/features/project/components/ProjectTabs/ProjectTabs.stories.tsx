import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ProjectSort, ProjectTab } from "@/features/project/types/enums"
import { ProjectTabs } from "./ProjectTabs"

const meta = {
  title: "Components/ProjectTabs",
  component: ProjectTabs,
  parameters: {
    layout: "centered",
  },
  args: {
    activeTab: ProjectTab.DISCOVER,
    sort: ProjectSort.RECENT,
  },
} satisfies Meta<typeof ProjectTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Narrow: Story = {
  name: "Narrow (wrapping)",
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
}
