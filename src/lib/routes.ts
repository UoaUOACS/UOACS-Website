export const Routes = {
  home: "/",
  team: "/team",
  sponsors: "/sponsors",
} as const

export type Route = (typeof Routes)[keyof typeof Routes]
