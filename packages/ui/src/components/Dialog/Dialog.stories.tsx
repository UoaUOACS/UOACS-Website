import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { Button } from "../Button/Button"
import { Dialog } from "./Dialog"

const meta: Meta<typeof Dialog> = {
  title: "Primitive Components/Dialog",
  component: Dialog,
  args: {
    title: "Dialog Title",
    children: "This is the dialog content.",
    open: false,
    onClose: () => {},
  },
  argTypes: {
    title: { control: "text" },
    children: { control: "text" },
    className: { control: "text" },
    open: { control: false },
    onClose: { control: false },
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Primary: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog {...args} onClose={() => setOpen(false)} open={open} />
      </>
    )
  },
}

export const NoTitle: Story = {
  args: {
    title: undefined,
  },
  render: Primary.render,
}

export const WithActions: Story = {
  args: {
    title: "Delete project?",
  },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Delete</Button>
        <Dialog {...args} onClose={() => setOpen(false)} open={open}>
          <p>This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setOpen(false)} theme="ghost">
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Delete</Button>
          </div>
        </Dialog>
      </>
    )
  },
}

const paragraphs = Array.from(
  { length: 20 },
  (_, i) =>
    `Paragraph ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
)

export const LongContent: Story = {
  args: {
    title: "Terms and Conditions",
  },
  render: (args) => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Long Dialog</Button>
        <Dialog {...args} onClose={() => setOpen(false)} open={open}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Dialog>
      </>
    )
  },
}
