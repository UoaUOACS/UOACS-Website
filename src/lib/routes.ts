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
  SIGN_UP: {
    ROOT: "/api/sign-up",
    SEND_OTP: "/api/sign-up/send-code",
    VERIFY_OTP: "/api/sign-up/verify-code",
  } as const,
  HEALTH: "/api/health",
  OG: "/og",
} as const

export type ApiRoute = (typeof ApiRoutes)[keyof typeof ApiRoutes]
