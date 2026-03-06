import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SOCIAL_LINKS } from "@/lib/constants"
import { SocialLinks, type SocialLinksProps } from "./SocialLinks"

const meta: Meta<SocialLinksProps> = {
  title: "Generic Components/SocialLinks",
  component: SocialLinks,
  argTypes: {
    links: { control: "object" },
    variant: { control: "radio", options: ["hero", "footer"] },
  },
  args: {
    links: SOCIAL_LINKS,
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
