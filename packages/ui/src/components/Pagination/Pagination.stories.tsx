import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { Pagination } from "./Pagination"

/**
 * Button-mode pagination that keeps its own page state, so the story can be clicked through.
 */
const InteractivePagination = ({
  page: initialPage,
  totalPages,
  siblingCount,
}: {
  page: number
  totalPages: number
  siblingCount?: number
}) => {
  const [page, setPage] = useState(initialPage)

  return (
    <Pagination
      onPageChange={setPage}
      page={page}
      siblingCount={siblingCount}
      totalPages={totalPages}
    />
  )
}

const meta: Meta<typeof Pagination> = {
  title: "Primitive Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  args: {
    page: 3,
    totalPages: 300,
    siblingCount: 1,
  },
  argTypes: {
    page: { control: { type: "number", min: 1 } },
    totalPages: { control: { type: "number", min: 1 } },
    siblingCount: { control: { type: "number", min: 0 } },
    getHref: { control: false },
    onPageChange: { control: false },
  },
  // Remount when the controls change so the story's page state resets to the new args
  render: ({ page, totalPages, siblingCount }) => (
    <InteractivePagination
      key={`${page}-${totalPages}-${siblingCount}`}
      page={page}
      siblingCount={siblingCount}
      totalPages={totalPages}
    />
  ),
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {}

export const FirstPage: Story = {
  args: { page: 1 },
}

export const LastPage: Story = {
  args: { page: 300 },
}

export const MiddlePage: Story = {
  args: { page: 150 },
}

export const FewPages: Story = {
  name: "Few pages (no ellipsis)",
  args: { page: 2, totalPages: 5 },
}

export const SinglePage: Story = {
  args: { page: 1, totalPages: 1 },
}

export const MoreSiblings: Story = {
  args: { page: 150, siblingCount: 2 },
}

export const WithLinks: Story = {
  name: "With links",
  render: ({ page, totalPages, siblingCount }) => (
    <Pagination
      getHref={(target) => `?page=${target}`}
      page={page}
      siblingCount={siblingCount}
      totalPages={totalPages}
    />
  ),
}
