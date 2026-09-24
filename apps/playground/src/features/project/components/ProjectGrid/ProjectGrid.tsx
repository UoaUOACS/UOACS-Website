import { EmptyState } from "@uoacs/ui"
import { type Project, ProjectCard } from "../ProjectCard/ProjectCard"

interface ProjectGridProps {
  projects: Project[]
}

export const ProjectGrid = ({ projects }: ProjectGridProps) => {
  if (projects.length === 0) {
    return (
      <EmptyState
        description="Projects will show up here once they've been added to this tab."
        title="No projects yet"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} variant="rounded" />
      ))}
    </div>
  )
}
