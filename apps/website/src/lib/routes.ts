export const Routes = {
  HOME: "/",
  TEAM: "/team",
  SPONSORS: "/sponsors",
  PRIVACY: "/privacy",
  PROFILE: "/profile",
  SIGN_UP: "/sign-up",
  LOGIN: "/login",
  GOOGLE_WALLET: "/google-wallet",
  EVENTS: "/events",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
} as const

export type Route = (typeof Routes)[keyof typeof Routes]

export const ApiRoutes = {
  ADMIN: {
    MEMBERS: (id: string | number | undefined) => `/api/admin/members/${id ?? ""}`,
  } as const,
  MEMBER: {
    ME: "/api/member/me",
  } as const,
  SIGN_UP: {
    ROOT: "/api/sign-up",
    VERIFICATION_CODE: "/api/sign-up/verification-code",
  } as const,
  FORGOT_PASSWORD: "/api/forgot-password",
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
