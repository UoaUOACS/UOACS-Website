"use client"

import { LazyImage } from "@uoacs/ui"
import { type ProjectCardVariants, projectCardVariants } from "./ProjectCard.variants"

export interface Project {
  id: string
  title: string
  imageURL?: string
}

interface ProjectCardProps extends ProjectCardVariants {
  project: Project
  className?: string
  onSelect?: (project: Project) => void
}

export const ProjectCard = ({ project, className, onSelect, variant }: ProjectCardProps) => {
  const { title, imageURL } = project
  const { base, imageWrapper, title: titleStyles } = projectCardVariants({ variant })

  return (
    <button className={base({ className })} onClick={() => onSelect?.(project)} type="button">
      <div className={imageWrapper()}>
        {imageURL ? (
          <LazyImage
            alt={title}
            className="object-cover!"
            containerClassName="h-full w-full"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            src={imageURL}
          />
        ) : null}
      </div>

      <span className={titleStyles()}>{title}</span>
    </button>
  )
}
