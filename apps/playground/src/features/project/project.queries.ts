import { cacheLife, cacheTag } from "next/cache"
import type { Project as ProjectCardData } from "@/features/project/components/ProjectCard/ProjectCard"
import type { DiscoverState } from "@/features/project/helpers/discover"
import { toProjectCard } from "@/features/project/helpers/toProjectCard"
import {
  PROJECT_SORT_OPTIONS,
  PROJECT_TABS,
  PROJECTS_PER_PAGE,
} from "@/features/project/project.constants"
import { CacheTags } from "@/lib/cache"
import { Slugs } from "@/lib/payload"
import { getPayloadClient } from "@/lib/payload/getPayloadClient"

export interface ProjectsPage {
  projects: ProjectCardData[]
  totalPages: number
}

export const getProjectsCached = async (state: DiscoverState) => {
  "use cache"
  cacheTag(CacheTags.PROJECTS)
  cacheLife("max")

  return getProjects(state)
}

export const getProjects = async ({ tab, sort, page }: DiscoverState): Promise<ProjectsPage> => {
  const payload = await getPayloadClient()

  const { docs, totalPages } = await payload.find({
    collection: Slugs.Collections.PROJECT,
    where: PROJECT_TABS.find((option) => option.value === tab)?.where,
    sort: PROJECT_SORT_OPTIONS[sort].payloadSort,
    limit: PROJECTS_PER_PAGE,
    page,
    depth: 1,
    select: { name: true, author: true, coverImage: true },
  })
  return { projects: docs.map(toProjectCard), totalPages }
}
