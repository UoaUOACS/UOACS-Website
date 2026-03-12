import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SocialLinks, type SocialLinksProps } from "./SocialLinks"

const meta: Meta<SocialLinksProps> = {
  title: "Generic Components/SocialLinks",
  component: SocialLinks,
  argTypes: {
    links: { control: "object" },
    variant: { control: "radio", options: ["hero", "footer"] },
  },
  args: {
    links: [
      { icon: "discord", label: "Discord", href: "https://discord.gg/HsG73WdWFm" },
      { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/uoacs25/" },
      { icon: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@uoacs?lang=en-GB" },
      {
        icon: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/university-of-auckland-compsci-society/posts/?feedView=all",
      },
    ],
  },
}

export default meta
type Story = StoryObj<SocialLinksProps>

export const Hero: Story = {
  args: { variant: "hero" },
}

export const Footer: Story = {
  args: { variant: "footer" },
  parameters: {
    backgrounds: { default: "dark" },
  },
}
