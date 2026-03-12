export const Routes = {
  home: "/",
  team: "/team",
  sponsors: "/sponsors",
  privacy: "/privacy",
  signUp: "/sign-up",
} as const

export type Route = (typeof Routes)[keyof typeof Routes]

export const ApiRoutes = {
  signUp: "/api/sign-up",
  health: "/api/health",
  og: "/og",
} as const

export type ApiRoute = (typeof ApiRoutes)[keyof typeof ApiRoutes]
