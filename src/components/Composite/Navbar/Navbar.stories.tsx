import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SOCIAL_ICONS } from "@/components/Primitive"
import { Navbar } from "./Navbar"

const meta: Meta<typeof Navbar> = {
  title: "Composite Components/Navbar",
  component: Navbar,
  args: {
    socialLinks: [
      { label: "Discord", icon: SOCIAL_ICONS.Discord, href: "https://discord.gg/xSgqAmGE" },
      {
        label: "Instagram",
        icon: SOCIAL_ICONS.Instagram,
        href: "https://www.instagram.com/uoacs25/",
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
      { label: "MEET THE TEAM", href: "/team" },
      { label: "OUR SPONSORS", href: "/sponsors" },
    ],
  },
  argTypes: {
    links: { control: "object" },
    socialLinks: { control: "object" },
  },
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Primary: Story = {}
