import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SOCIAL_ICONS } from "@uoacs/ui"
import { Footer } from "./Footer"

const meta: Meta<typeof Footer> = {
  title: "Home/Footer",
  component: Footer,
  args: {
    socialLinks: [
      { label: "Discord", icon: SOCIAL_ICONS.Discord, href: "https://discord.gg/xSgqAmGE" },
      {
        label: "Instagram",
        icon: SOCIAL_ICONS.Instagram,
        href: "https://www.instagram.com/uoacompsci/",
      },
      {
        label: "TikTok",
        icon: SOCIAL_ICONS.TikTok,
        href: "https://www.tiktok.com/@uoacs?lang=en-GB",
      },
      {
        label: "LinkedIn",
        icon: SOCIAL_ICONS.LinkedIn,
        href: "https://www.linkedin.com/company/university-of-auckland-compsci-society/posts/?feedView=all",
      },
    ],
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
    ],
  },
  argTypes: {
    links: { control: "object" },
    socialLinks: { control: "object" },
  },
}

export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {
  args: {},
}
