import type { SOCIAL_ICONS } from "./SocialIcon.constants"

/**
 * Represents a valid string literal for social media icons.
 * Defined in the SOCIAL_ICONS constants
 */
export type SocialIconName = (typeof SOCIAL_ICONS)[keyof typeof SOCIAL_ICONS]

export interface SocialIconProps extends React.SVGAttributes<SVGElement> {
  /**
   * The name of the social media platform to render the corresponding icon. If not provided, no icon will be rendered.
   * @warn Prefer using `SocialIcons.[platform]` for better type safety and readability.
   */
  icon: SocialIconName
}

/**
 * The `InnerSocialIconProps` type represents the props for the individual social media icon components
 * (e.g., LinkedIn, Discord, Instagram, TikTok) that are used within the `SocialIcon` namespace.
 * It omits the `icon` prop from `SocialIconProps` since each specific icon component already knows which icon it represents.
 */
export type InnerSocialIconProps = Omit<SocialIconProps, "icon">
