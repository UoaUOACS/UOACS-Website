import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ProjectSort } from "@/features/project/types/enums"
import { ProjectSortDropdown } from "./ProjectSortDropdown"

const meta = {
  title: "Components/ProjectSortDropdown",
  component: ProjectSortDropdown,
  parameters: {
    layout: "centered",
  },
  args: {
    sort: ProjectSort.RECENT,
    getSortHref: (sort: ProjectSort) => `?sort=${sort}`,
  },
  argTypes: {
    sort: { control: "select", options: Object.values(ProjectSort) },
    getSortHref: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ height: 200 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectSortDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Recent: Story = {}

export const AToZ: Story = {
  name: "A-Z",
  args: { sort: ProjectSort.A_TO_Z },
}
