import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Toaster } from "@uoacs/ui/toast"
import { projectFormOptions } from "@/features/project/editor/projectForm.options"
import { Slugs } from "@/lib/payload/slugs"
import { ProjectEditor } from "./ProjectEditor"
import { ProjectEditorSkeleton } from "./ProjectEditorSkeleton"

const meta = {
  title: "Project/ProjectEditor",
  component: ProjectEditor,
  parameters: { layout: "padded", nextjs: { appDirectory: true } },
  args: { initialValues: projectFormOptions.defaultValues },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-6xl">
        <Story />
        <Toaster />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectEditor>

export default meta
type Story = StoryObj<typeof meta>

/**
 * A new project. Saving needs a block, which block editing adds.
 */
export const Create: Story = {}

export const Edit: Story = {
  args: {
    projectID: "000000000000000000000001",
    coverImageURL: "https://placehold.co/800x600",
    initialValues: {
      name: "UOACS Socials",
      summary: "Posters and social media posts for UOACS events.",
      coverImage: "000000000000000000000002",
      pageContent: [
        {
          _key: "000000000000000000000003",
          id: "000000000000000000000003",
          blockType: Slugs.Blocks.IMAGE_GRID,
          images: ["000000000000000000000002"],
        },
      ],
    },
  },
}

export const Loading: Story = {
  render: () => <ProjectEditorSkeleton />,
}
