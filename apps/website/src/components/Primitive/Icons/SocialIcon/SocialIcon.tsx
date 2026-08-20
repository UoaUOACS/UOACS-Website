import { DiscordIcon } from "./DiscordIcon"
import { InstagramIcon } from "./InstagramIcon"
import { LinkedinIcon } from "./LinkedinIcon"
import { SOCIAL_ICONS } from "./SocialIcon.constants"
import type { SocialIconProps } from "./SocialIcon.types"
import { TikTokIcon } from "./TikTokIcon"

/**
 * A component that renders a specific social media icon based on the provided `icon` prop. It serves as a base component for the `SocialIcon` namespace, which provides specific icons as subcomponents for easier usage and better type safety.
 *
 * @param icon The name of the social media platform to render the corresponding icon. If not provided, no icon will be rendered.
 * @param props Standard SVG attributes to be applied to the rendered icon.
 * @returns A specific social media icon based on the `icon` prop or null if the icon is not recognized.
 * @warn Prefer using `SocialIcons.[platform]` for better type safety and readability.
 */
export const SocialIcon = ({ icon, ...props }: SocialIconProps) => {
  switch (icon) {
    case SOCIAL_ICONS.LinkedIn:
      return <LinkedinIcon {...props} />
    case SOCIAL_ICONS.Discord:
      return <DiscordIcon {...props} />
    case SOCIAL_ICONS.Instagram:
      return <InstagramIcon {...props} />
    case SOCIAL_ICONS.TikTok:
      return <TikTokIcon {...props} />
    default:
      return null
  }
}
