export const Routes = {
  HOME: "/",
  TEAM: "/team",
  SPONSORS: "/sponsors",
  PRIVACY: "/privacy",
  SIGN_UP: "/sign-up",
} as const

export type Route = (typeof Routes)[keyof typeof Routes]

export const ApiRoutes = {
  SIGN_UP: "/api/sign-up",
  HEALTH: "/api/health",
  OG: "/og",
} as const

export type ApiRoute = (typeof ApiRoutes)[keyof typeof ApiRoutes]
