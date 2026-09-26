import type { Project } from "@/features/project/components/ProjectCard/ProjectCard"

export const Routes = {
  PROJECTS: {
    ID: (id: Project["id"]) => `/projects/${id}`,
  },
} as const

type DeepValues<T> = T extends (...args: never[]) => infer R
  ? R
  : T extends object
    ? { [K in keyof T]: DeepValues<T[K]> }[keyof T]
    : T

export type AppRoute = DeepValues<typeof Routes>
