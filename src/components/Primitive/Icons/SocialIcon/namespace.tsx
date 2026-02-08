import type { FC } from "react"
import { SocialIcon } from "./SocialIcon"
import { SOCIAL_ICONS } from "./SocialIcon.constants"
import type { InnerSocialIconProps, SocialIconProps } from "./SocialIcon.types"

/**
 * A namespace component that provides specific social media icons as subcomponents for easier usage and better type safety.
 *
 * @param props Standard SVG attributes along with the `icon` prop to determine which social media icon to render.
 * @returns A specific social media icon based on the `icon` prop or null if the icon is not recognized.
 */
interface SocialIconComponent extends FC<SocialIconProps> {
  LinkedIn: FC<InnerSocialIconProps>
  Discord: FC<InnerSocialIconProps>
  Instagram: FC<InnerSocialIconProps>
  TikTok: FC<InnerSocialIconProps>
}

/**
 * The `SocialIcon` component serves as a namespace for specific social media icons, allowing for easy access to each icon as a subcomponent.
 * Each subcomponent corresponds to a specific social media platform and renders the appropriate SVG icon.
 */
const SocialIconWithNameSpace = SocialIcon as SocialIconComponent

SocialIconWithNameSpace.LinkedIn = (props) => <SocialIcon icon={SOCIAL_ICONS.LinkedIn} {...props} />
SocialIconWithNameSpace.Discord = (props) => <SocialIcon icon={SOCIAL_ICONS.Discord} {...props} />
SocialIconWithNameSpace.Instagram = (props) => (
  <SocialIcon icon={SOCIAL_ICONS.Instagram} {...props} />
)
SocialIconWithNameSpace.TikTok = (props) => <SocialIcon icon={SOCIAL_ICONS.TikTok} {...props} />

export { SocialIconWithNameSpace as SocialIcon }
