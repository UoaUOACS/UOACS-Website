export const Routes = {
  home: "/",
  team: "/team",
  sponsors: "/sponsors",
  privacy: "/privacy",
  signUp: "/sign-up",
} as const

export type Route = (typeof Routes)[keyof typeof Routes]
