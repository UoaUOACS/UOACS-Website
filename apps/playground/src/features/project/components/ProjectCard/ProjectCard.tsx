"use client"

import { LazyImage } from "@uoacs/ui"
import Link from "next/link"
import { useId } from "react"
import { type ProjectCardVariants, projectCardVariants } from "./ProjectCard.variants"

export interface Project {
  id: string
  title: string
  imageURL?: string
}

interface ProjectCardProps extends ProjectCardVariants {
  project: Project
  className?: string
}

export const ProjectCard = ({ project, className, variant }: ProjectCardProps) => {
  const clipId = useId()
  const { id, title, imageURL } = project
  const { base, imageWrapper, titleTab, title: titleStyles } = projectCardVariants({ variant })

  return (
    <Link className={base({ className })} href={`/projects/${id}`}>
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

      <div
        className="pointer-events-none absolute right-[12%] bottom-0 h-[18%] w-6 bg-black/25 blur-lg"
        style={{ zIndex: 0 }}
      />

      <div
        className={titleTab()}
        style={{ clipPath: `url(#${clipId})`, ["--tab-cut" as keyof React.CSSProperties]: "0.12" }}
      >
        <div
          className="flex justify-center px-6 pt-[8%]"
          style={{ width: "calc((1 - var(--tab-cut)) * 100%)" }}
        >
          <span className={titleStyles()}>{title}</span>
        </div>
      </div>

      <svg aria-hidden="true" className="absolute" focusable="false" height="0" width="0">
        <defs>
          <clipPath clipPathUnits="objectBoundingBox" id={clipId}>
            <path
              d="
          M 0,0
          L 0.29,0
          Q 0.32,0 0.331,0.028
          L 0.40,0.20
          L 0.80,0.20
          A 0.08,0.26 0 0 1 0.88,0.46
          L 0.88,1
          L 0,1
          Z
        "
            />
          </clipPath>
        </defs>
      </svg>
    </Link>
  )
}
