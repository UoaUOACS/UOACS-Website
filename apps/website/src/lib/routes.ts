export const Routes = {
  HOME: "/",
  TEAM: "/team",
  SPONSORS: "/sponsors",
  PRIVACY: "/privacy",
  PROFILE: "/profile",
  GOOGLE_WALLET: "/google-wallet",
  EVENTS: "/events",
} as const

export type Route = (typeof Routes)[keyof typeof Routes]

export const ApiRoutes = {
  MEMBER: {
    ME: "/api/member/me",
  } as const,
  HEALTH: "/api/health",
  EVENTS: (upcoming: boolean, page: number) => `/api/events?upcoming=${upcoming}&page=${page}`,
  GOOGLE_WALLET: {
    LINK: "/api/google-wallet/link",
    PASS: "/api/google-wallet/pass",
  },
  OG: "/og",
  PROFILE: "/api/profile",
} as const

export type ApiRoute = (typeof ApiRoutes)[keyof typeof ApiRoutes]
