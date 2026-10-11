import { cacheLife, cacheTag } from "next/cache"
import { connection } from "next/server"
import type { Where } from "payload"
import type { Project as ProjectCardData } from "@/features/project/components/ProjectCard/ProjectCard"
import type { DiscoverState } from "@/features/project/helpers/discover"
import { toProjectCard } from "@/features/project/helpers/toProjectCard"
import {
  PROJECT_SORT_OPTIONS,
  PROJECT_TABS,
  PROJECTS_PER_PAGE,
} from "@/features/project/project.constants"
import type { ProjectSort } from "@/features/project/types/enums"
import { CacheTags } from "@/lib/cache"
import { Slugs } from "@/lib/payload"
import { getPayloadClient } from "@/lib/payload/getPayloadClient"
import type { SearchState } from "../search/helpers/search"

export interface ProjectsPage {
  projects: ProjectCardData[]
  totalPages: number
}

interface FindProjectsArgs {
  where?: Where
  sort: ProjectSort
  page: number
}

const findProjects = async ({ where, sort, page }: FindProjectsArgs): Promise<ProjectsPage> => {
  const payload = await getPayloadClient()

  const { docs, totalPages } = await payload.find({
    collection: Slugs.Collections.PROJECT,
    where,
    sort: PROJECT_SORT_OPTIONS[sort].payloadSort,
    limit: PROJECTS_PER_PAGE,
    page,
    depth: 1,
    select: { name: true, author: true, coverImage: true, likeCount: true },
    // Only the author's username is shown, so don't load the rest of the member
    populate: { [Slugs.Collections.MEMBER]: { username: true } },
  })
  return { projects: docs.map(toProjectCard), totalPages }
}

export const getProjectsCached = async (state: DiscoverState) => {
  "use cache"
  cacheTag(CacheTags.PROJECTS.ROOT, CacheTags.MEDIA)
  cacheLife("max")

  return getProjects(state)
}

export const getProjects = ({ tab, sort, page }: DiscoverState) =>
  findProjects({ where: PROJECT_TABS.find((option) => option.value === tab)?.where, sort, page })

/**
 * Not cached: open-ended queries rarely repeat, so caching them would only evict useful entries.
 */
export const searchProjects = async ({ q, sort, page }: SearchState) => {
  // Payload reads the current time in find, so wait for a real request instead of prerendering
  await connection()

  return findProjects({ where: q ? { name: { contains: q } } : undefined, sort, page })
}
