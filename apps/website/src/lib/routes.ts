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

/**
 * Absolute website URL for a path, for example to use as an auth return URL.
 *
 * @param path The path on the website, for example `/profile`.
 * @returns The absolute URL.
 */
export function websiteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_WEBSITE_URL
  if (!base) throw new Error("Missing required environment variable: NEXT_PUBLIC_WEBSITE_URL")
  return new URL(path, base).toString()
}

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
