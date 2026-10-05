import { cacheLife, cacheTag } from "next/cache"
import type { Where } from "payload"
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

export interface ProjectsQuery extends DiscoverState {
  /**
   * Text to match against project names. Omit for no search filter.
   */
  q?: string
}
export const getProjectsCached = async (query: ProjectsQuery) => {
  "use cache"
  cacheTag(CacheTags.PROJECTS.ROOT, CacheTags.MEDIA)
  cacheLife("max")

  return getProjects(query)
}

export const getProjects = async ({ tab, sort, page, q }: ProjectsQuery): Promise<ProjectsPage> => {
  const payload = await getPayloadClient()

  const tabWhere = PROJECT_TABS.find((option) => option.value === tab)?.where
  const searchWhere: Where | undefined = q ? { name: { contains: q } } : undefined
  const filters = [tabWhere, searchWhere].filter((where): where is Where => where !== undefined)

  const { docs, totalPages } = await payload.find({
    collection: Slugs.Collections.PROJECT,
    where: filters.length > 0 ? { and: filters } : undefined,
    sort: PROJECT_SORT_OPTIONS[sort].payloadSort,
    limit: PROJECTS_PER_PAGE,
    page,
    depth: 1,
    select: { name: true, author: true, coverImage: true },
    // Only the author's username is shown, so don't load the rest of the member
    populate: { [Slugs.Collections.MEMBER]: { username: true } },
  })
  return { projects: docs.map(toProjectCard), totalPages }
}
