import { EmptyState } from "@uoacs/ui"
import { type Project, ProjectCard } from "../ProjectCard/ProjectCard"

interface ProjectGridProps {
  projects: Project[]
  onSelectProject?: (project: Project) => void
}

export const ProjectGrid = ({ projects, onSelectProject }: ProjectGridProps) => {
  if (projects.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} onSelect={onSelectProject} project={project} />
      ))}
    </div>
  )
}
