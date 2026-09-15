// ProjectCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { type Project, ProjectCard } from "./ProjectCard"

const mockProjectWithImage: Project = {
  id: "1",
  title: "Project Playground",
  imageURL: "next.svg",
}

const mockProjectNoImage: Project = {
  id: "2",
  title: "Events Hub",
}

const meta = {
  title: "Components/ProjectCard",
  component: ProjectCard,
  parameters: {
    layout: "centered",
    backgrounds: { default: "pink-shell" },
  },
  args: {
    onSelect: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "rounded"],
    },
  },
} satisfies Meta<typeof ProjectCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    project: mockProjectWithImage,
  },
}

export const Rounded: Story = {
  args: {
    project: mockProjectWithImage,
    variant: "rounded",
  },
}

export const NoImage: Story = {
  name: "No image (fallback white surface)",
  args: {
    project: mockProjectNoImage,
  },
}

export const LongTitle: Story = {
  args: {
    project: {
      id: "3",
      title: "A Very Long Project Title That Might Wrap Onto Two Lines Beneath The Card",
      imageURL: "https://placehold.co/400x300",
    },
  },
}
