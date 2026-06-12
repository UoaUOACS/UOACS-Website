export const Routes = {
  HOME: "/",
  TEAM: "/team",
  SPONSORS: "/sponsors",
  PRIVACY: "/privacy",
  PROFILE: "/profile",
  SIGN_UP: "/sign-up",
  LOGIN: "/login",
  GOOGLE_WALLET: "/google-wallet",
} as const

export type Route = (typeof Routes)[keyof typeof Routes]

export const ApiRoutes = {
  ADMIN: {
    MEMBERS: (id: string | number | undefined) => `/api/admin/members/${id ?? ""}`,
  } as const,
  SIGN_UP: {
    ROOT: "/api/sign-up",
    VERIFICATION_CODE: "/api/sign-up/verification-code",
  } as const,
  HEALTH: "/api/health",
  GOOGLE_WALLET: {
    LINK: "/api/google-wallet/link",
    PASS: "/api/google-wallet/pass",
  },
  MEMBER: {
    ME: "/api/member/me",
  },
  OG: "/og",
} as const

export type ApiRoute = (typeof ApiRoutes)[keyof typeof ApiRoutes]
