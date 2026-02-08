import type { Meta, StoryFn, StoryObj } from "@storybook/react"
import { SocialIcon } from "./namespace"
import { SOCIAL_ICONS } from "./SocialIcon.constants"

const meta: Meta<typeof SocialIcon> = {
  title: "Primitive Components/Icons/Social Icons",
  component: SocialIcon,
  args: {
    className: "",
  },
  argTypes: {
    icon: { control: "select", options: Object.values(SOCIAL_ICONS) },
    className: { control: "text" },
  },
}

export default meta
type StoryFunction = StoryFn<typeof SocialIcon>
type StoryObject = StoryObj<typeof SocialIcon>

export const AllIcons: StoryFunction = (args) => {
  return (
    <div className="flex items-center gap-4">
      <SocialIcon.LinkedIn {...args} />
      <SocialIcon.Discord {...args} />
      <SocialIcon.Instagram {...args} />
      <SocialIcon.TikTok {...args} />
    </div>
  )
}

AllIcons.parameters = {
  controls: { exclude: ["icon"] },
}

export const LinkedIn: StoryObject = {
  args: {
    icon: SOCIAL_ICONS.LinkedIn,
  },
}

export const Discord: StoryObject = {
  args: {
    icon: SOCIAL_ICONS.Discord,
  },
}

export const Instagram: StoryObject = {
  args: {
    icon: SOCIAL_ICONS.Instagram,
  },
}

export const TikTok: StoryObject = {
  args: {
    icon: SOCIAL_ICONS.TikTok,
  },
}
