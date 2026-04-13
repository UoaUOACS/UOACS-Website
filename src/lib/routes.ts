export const Routes = {
  HOME: "/",
  TEAM: "/team",
  SPONSORS: "/sponsors",
  PRIVACY: "/privacy",
  SIGN_UP: "/sign-up",
  LOGIN: "/login",
} as const

export type Route = (typeof Routes)[keyof typeof Routes]

export const ApiRoutes = {
  ADMIN: {
    MEMBERS: (id: string | number | undefined) => `/api/admin/members/${id ?? ""}`,
  } as const,
  SIGN_UP: "/api/sign-up",
  HEALTH: "/api/health",
  WALLET_TEST: "/api/wallet_test",
  OG: "/og",
} as const

export type ApiRoute = (typeof ApiRoutes)[keyof typeof ApiRoutes]
