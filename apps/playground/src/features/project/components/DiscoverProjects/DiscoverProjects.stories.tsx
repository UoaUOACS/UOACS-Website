import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PROJECTS_PER_PAGE } from "@/features/project/project.constants"
import { ProjectSort, ProjectTab } from "@/features/project/types/enums"
import type { Project } from "../ProjectCard/ProjectCard"
import { DiscoverProjectsSkeleton } from "./DiscoverProjectsSkeleton"
import { DiscoverProjectsView } from "./DiscoverProjectsView"

const mockProjects: Project[] = Array.from({ length: PROJECTS_PER_PAGE }, (_, i) => ({
  id: String(i + 1),
  title: `Project ${i + 1}`,
  imageURL: i % 4 === 3 ? undefined : "https://placehold.co/400x300",
  authorName: "Name Of Author",
  likes: 0,
}))

const meta = {
  title: "Components/DiscoverProjects",
  component: DiscoverProjectsView,
  parameters: {
    layout: "padded",
  },
  args: {
    tab: ProjectTab.DISCOVER,
    sort: ProjectSort.RECENT,
    page: 1,
    totalPages: 12,
    projects: mockProjects,
  },
  argTypes: {
    sort: { control: "select", options: Object.values(ProjectSort) },
    tab: { control: false },
    projects: { control: false },
  },
} satisfies Meta<typeof DiscoverProjectsView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MiddlePage: Story = {
  args: { page: 6, sort: ProjectSort.A_TO_Z },
}

export const SinglePage: Story = {
  name: "Single page (no pagination)",
  args: { projects: mockProjects.slice(0, 4), totalPages: 1 },
}

export const Empty: Story = {
  args: { projects: [], totalPages: 0 },
}

export const Loading: Story = {
  render: () => <DiscoverProjectsSkeleton />,
}
