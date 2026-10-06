import type { Project } from "@/features/project/components/ProjectCard/ProjectCard"
import type { Member } from "@/payload/payload-types"

export const Routes = {
  HOME: "/",
  PROFILE: {
    ROOT: "/profile",
    USERNAME: (username: Member["username"]) => `/profile/${username}`,
    EDIT: "/profile/edit",
  },
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
