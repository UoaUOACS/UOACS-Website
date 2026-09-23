/**
 * An outbound link shown under a profile's bio.
 */
export interface ProfileLink {
  /**
   * Visible text for the link, e.g. a shortened URL.
   */
  label: string
  /**
   * Destination of the link.
   */
  href: string
}

/**
 * The identity details rendered at the top of a Project Playground profile.
 *
 * Deliberately free of project data: what a profile owns (projects, awards) is
 * counted by the tab switcher and rendered by whatever fills the tab panel.
 */
export interface Profile {
  /**
   * Display name shown as the page heading.
   */
  name: string
  /**
   * Handle shown under the name, without the leading "@".
   */
  username: string
  /**
   * Short free-text bio. Omitted profiles simply drop the line.
   */
  bio?: string
  /**
   * Optional link to a personal site, portfolio, or socials.
   */
  link?: ProfileLink
}
