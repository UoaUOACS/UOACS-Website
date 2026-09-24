import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import type { Project } from "../ProjectCard/ProjectCard"
import { ProjectGrid } from "./ProjectGrid"

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Project Playground",
    imageURL: "https://placehold.co/400x300",
    authorName: "Name Of Author",
  },
  {
    id: "2",
    title: "Committee Portal",
    imageURL: "https://placehold.co/400x300",
    authorName: "Name Of Author",
  },
  { id: "3", title: "Events Hub", authorName: "Name Of Author" },
  {
    id: "4",
    title: "Sponsorship Tracker",
    imageURL: "https://placehold.co/400x300",
    authorName: "Name Of Author",
  },
  {
    id: "5",
    title: "Alumni Directory",
    imageURL: "https://placehold.co/400x300",
    authorName: "Name Of Author",
  },
]

const meta = {
  title: "Components/ProjectGrid",
  component: ProjectGrid,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "pink-shell" },
  },
} satisfies Meta<typeof ProjectGrid>

export default meta
type Story = StoryObj<typeof meta>

export const ThreeAcross: Story = {
  args: {
    projects: mockProjects,
  },
}

export const SingleProject: Story = {
  args: {
    projects: [mockProjects[0]],
  },
}

export const Empty: Story = {
  name: "Empty tab (no projects)",
  args: {
    projects: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/no projects yet/i)).toBeInTheDocument()
  },
}
