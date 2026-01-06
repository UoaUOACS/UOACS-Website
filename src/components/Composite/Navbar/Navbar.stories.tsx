import { faDiscord, faInstagram, faLinkedin, faTiktok } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { Meta, StoryObj } from "@storybook/react"
import { Navbar } from "./Navbar"

const meta: Meta<typeof Navbar> = {
  title: "Composite Components/Navbar",
  component: Navbar,
  args: {
    socialLinks: [
      {
        label: (
          <>
            <FontAwesomeIcon icon={faDiscord} /> Discord
          </>
        ),
        href: "https://discord.gg/xSgqAmGE",
      },
      {
        label: (
          <>
            <FontAwesomeIcon icon={faInstagram} /> Instagram
          </>
        ),
        href: "https://www.instagram.com/uoacs25/",
      },
      {
        label: (
          <>
            <FontAwesomeIcon icon={faTiktok} /> TikTok
          </>
        ),
        href: "https://www.tiktok.com/@uoacs?lang=en-GB",
      },
      {
        label: (
          <>
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </>
        ),
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
