import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SOCIAL_ICONS } from "@uoacs/ui"
import type { DiscordWidgetData } from "../../schemas/discord"
import { Footer } from "./Footer"

const mockDiscordWidgetData: DiscordWidgetData = {
  id: "0",
  name: "UOACS",
  instant_invite: "https://discord.gg/xSgqAmGE",
  presence_count: 42,
  members: Array.from({ length: 8 }, (_, i) => ({
    id: String(i),
    username: `member-${i}`,
    avatar_url: `https://cdn.discordapp.com/embed/avatars/${i % 6}.png`,
    status: "online" as const,
  })),
}

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
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
    discordWidgetData: mockDiscordWidgetData,
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

export const NoLiveWidget: Story = {
  args: {
    discordWidgetData: null,
  },
}
