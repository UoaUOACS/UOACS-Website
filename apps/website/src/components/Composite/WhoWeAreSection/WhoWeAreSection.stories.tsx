import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { WhoWeAreSection } from "./WhoWeAreSection"

const meta: Meta<typeof WhoWeAreSection> = {
  title: "Composite Components/WhoWeAreSection",
  component: WhoWeAreSection,
  args: {
    polaroids: [
      {
        id: "polaroid1",
        caption: "Pool Night",
        image: {
          id: "image1",
          url: "media/Pool.jpeg",
          alt: "People playing pool",
          createdAt: "2023-10-01T12:00:00Z",
          updatedAt: "2023-10-01T12:00:00Z",
        },
        createdAt: "2023-10-01T12:00:00Z",
        updatedAt: "2023-10-01T12:00:00Z",
      },
      {
        id: "polaroid2",
        caption: "Pool Night",
        image: {
          id: "image1",
          url: "media/Pool.jpeg",
          alt: "People playing pool",
          createdAt: "2023-10-01T12:00:00Z",
          updatedAt: "2023-10-01T12:00:00Z",
        },
        createdAt: "2023-10-01T12:00:00Z",
        updatedAt: "2023-10-01T12:00:00Z",
      },
      {
        id: "polaroid3",
        caption: "Pool Night",
        image: {
          id: "image1",
          url: "media/Pool.jpeg",
          alt: "People playing pool",
          createdAt: "2023-10-01T12:00:00Z",
          updatedAt: "2023-10-01T12:00:00Z",
        },
        createdAt: "2023-10-01T12:00:00Z",
        updatedAt: "2023-10-01T12:00:00Z",
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof WhoWeAreSection>

export const Default: Story = {}
