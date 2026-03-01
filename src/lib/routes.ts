export const Routes = {
  home: "/",
  team: "/team",
  sponsors: "/sponsors",
  privacy: "/privacy",
} as const

export type Route = (typeof Routes)[keyof typeof Routes]
