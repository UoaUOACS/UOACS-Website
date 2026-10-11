import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Toaster } from "@uoacs/ui/toast"
import { expect, mocked, screen } from "storybook/test"
import { editMember } from "@/features/member/actions/editMember"
import { mockMember } from "@/features/profile/mocks/Member.mock"
import { EditProfileForm } from "./EditProfileForm"

const meta = {
  title: "Profile/EditProfileForm",
  component: EditProfileForm,
  parameters: {
    nextjs: { appDirectory: true },
  },
  args: {
    member: {
      ...mockMember,
      profilePicture: {
        id: "68e380871023ec09c1a45eb3",
        alt: "Profile picture",
        url: "https://placehold.co/240x240?text=PFP",
        createdAt: "2026-01-04T02:22:09.601Z",
        updatedAt: "2026-01-04T02:22:09.601Z",
      },
      bio: "Hi, I'm Jane! I'm a student who enjoys learning new things, spending time with friends and family, and exploring my interests.",
      skills: ["Python", "UI/UX Design"],
      links: [{ name: "GITHUB", url: "https://github.com/janedoe" }],
    },
    // Dummy data: languages have no backend yet
    languages: ["English", "Chinese"],
  },
  decorators: (Story) => (
    <>
      <Story />
      <Toaster />
    </>
  ),
} satisfies Meta<typeof EditProfileForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = {
  args: {
    member: { ...mockMember, profilePicture: null, bio: null, skills: null, links: null },
    languages: [],
  },
}

export const SavesChanges: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByLabelText("Bio"), " I love hackathons.")
    await userEvent.click(canvas.getByRole("button", { name: "Add a skill" }))
    await userEvent.click(await canvas.findByRole("menuitem", { name: "Rust" }))
    await userEvent.click(canvas.getByRole("button", { name: "Update" }))

    // Only the fields `editMember` takes are sent
    await expect(editMember).toHaveBeenCalledWith({
      bio: expect.stringContaining("I love hackathons."),
      skills: ["Python", "UI/UX Design", "Rust"],
      links: [{ name: "GITHUB", url: "https://github.com/janedoe" }],
    })
    // The toast renders outside the story's canvas
    await expect(await screen.findByText("Profile updated")).toBeInTheDocument()
  },
}

export const RejectsInvalidLink: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Add a link" }))
    await userEvent.type(canvas.getByLabelText("LinkedIn URL"), "https://example.com")
    await userEvent.click(canvas.getByRole("button", { name: "Update" }))

    await expect(
      await canvas.findByText("LinkedIn URL must start with https://www.linkedin.com/in/"),
    ).toBeVisible()
    await expect(editMember).not.toHaveBeenCalled()
  },
}

export const ShowsSaveError: Story = {
  beforeEach: () => {
    mocked(editMember).mockResolvedValueOnce({ ok: false, error: "server" })
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Remove GitHub link" }))
    await userEvent.click(canvas.getByRole("button", { name: "Update" }))

    await expect(await screen.findByText("Something went wrong. Try again.")).toBeInTheDocument()
  },
}
