import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import type { Project } from "../ProjectCard/ProjectCard"
import { ProjectGrid } from "./ProjectGrid"

const mockProjects: Project[] = [
  { id: "1", title: "Project Playground", imageURL: "https://placehold.co/400x300" },
  { id: "2", title: "Committee Portal", imageURL: "https://placehold.co/400x300" },
  { id: "3", title: "Events Hub" },
  { id: "4", title: "Sponsorship Tracker", imageURL: "https://placehold.co/400x300" },
  { id: "5", title: "Alumni Directory", imageURL: "https://placehold.co/400x300" },
]

const meta = {
  title: "Components/ProjectGrid",
  component: ProjectGrid,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "pink-shell" },
  },
  args: {
    onSelectProject: fn(),
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
}
