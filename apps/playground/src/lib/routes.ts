export const Routes = {
  PROJECTS: (id: string | number | undefined) => `/projects/${id ?? ""}`,
} as const

export type Route = (typeof Routes)[keyof typeof Routes]
