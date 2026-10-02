import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { type Project, ProjectCard } from "./ProjectCard"

const mockProjectWithImage: Project = {
  id: "1",
  title: "Project Playground",
  imageURL: "https://placehold.co/400x300",
  authorName: "Name Of Author",
  likes: 1000,
}

const mockProjectNoImage: Project = {
  id: "2",
  title: "Events Hub",
  authorName: "Jane Smith",
  likes: 1000,
}

const meta = {
  title: "Components/ProjectCard",
  component: ProjectCard,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    project: mockProjectWithImage,
  },
}

export const WithAward: Story = {
  name: "With award",
  args: {
    project: { ...mockProjectWithImage, awardType: "Best Design" },
  },
}

export const NoImage: Story = {
  name: "No image (fallback gray surface)",
  args: {
    project: mockProjectNoImage,
  },
}

export const NoImageWithAward: Story = {
  name: "No image with award",
  args: {
    project: { ...mockProjectNoImage, awardType: "Best Design" },
  },
}

export const LongAuthorName: Story = {
  name: "Long author name",
  args: {
    project: {
      id: "3",
      title: "Design Systems Workshop",
      imageURL: "https://placehold.co/400x300",
      authorName: "A Very Long Author Name That Should Truncate Nicely",
      likes: 1000,
      awardType: "Best Design",
    },
  },
}

export const LongTitle: Story = {
  name: "Long title",
  args: {
    project: {
      id: "4",
      title: "A Very Long Project Title That Might Wrap Onto Several Lines Over The Image",
      imageURL: "https://placehold.co/400x300",
      authorName: "Name Of Author",
      likes: 31415,
    },
  },
}
