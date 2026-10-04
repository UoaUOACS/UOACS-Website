import type { Project } from "@/features/project/components/ProjectCard/ProjectCard"

export const Routes = {
  HOME: "/",
  PROFILE: "/profile",
  SEARCH: "/search",
  PROJECTS: {
    ID: (id: Project["id"]) => `/projects/${id}`,
    CREATE: "/projects/create",
  },
} as const

export type DeepValues<T> = T extends (...args: never[]) => infer R
  ? R
  : T extends object
    ? { [K in keyof T]: DeepValues<T[K]> }[keyof T]
    : T

export type AppRoute = DeepValues<typeof Routes>
