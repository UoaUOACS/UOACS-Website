import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PROJECTS_PER_PAGE } from "@/features/project/project.constants"
import type { Project } from "../ProjectCard/ProjectCard"
import { PaginatedProjectGrid } from "./PaginatedProjectGrid"
import { PaginatedProjectGridSkeleton } from "./PaginatedProjectGridSkeleton"

const mockProjects: Project[] = Array.from({ length: PROJECTS_PER_PAGE }, (_, i) => ({
  id: String(i + 1),
  title: `Project ${i + 1}`,
  imageURL: i % 4 === 3 ? undefined : "https://placehold.co/400x300",
  authorName: "Name Of Author",
  likes: 0,
}))

const meta = {
  title: "Components/PaginatedProjectGrid",
  component: PaginatedProjectGrid,
  parameters: {
    layout: "padded",
  },
  args: {
    projects: mockProjects,
    page: 1,
    totalPages: 12,
    getPageHref: (page: number) => `?page=${page}`,
  },
  argTypes: {
    projects: { control: false },
    getPageHref: { control: false },
  },
} satisfies Meta<typeof PaginatedProjectGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MiddlePage: Story = {
  args: { page: 6 },
}

export const SinglePage: Story = {
  name: "Single page (no pagination)",
  args: { projects: mockProjects.slice(0, 4), totalPages: 1 },
}

export const Empty: Story = {
  args: { projects: [], totalPages: 0 },
}

export const Loading: Story = {
  render: () => <PaginatedProjectGridSkeleton />,
}
