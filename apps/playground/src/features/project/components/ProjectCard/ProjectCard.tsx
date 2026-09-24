"use client"

import { LazyImage } from "@uoacs/ui"
import Link from "next/link"
import { type ProjectCardVariants, projectCardVariants } from "./ProjectCard.variants"

export interface Project {
  id: string
  title: string
  imageURL?: string
  authorName: string
}

interface ProjectCardProps extends ProjectCardVariants {
  project: Project
  className?: string
}

interface IconProps {
  className?: string
  size?: number
}

const UserIcon = ({ className, size = 16 }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    focusable="false"
    height={size}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width={size}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const TrophyIcon = ({ className, size = 18 }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    focusable="false"
    height={size}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width={size}
  >
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 4h10v6a5 5 0 0 1-10 0V4Z" />
    <path d="M17 5h3a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4" />
    <path d="M7 5H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4" />
  </svg>
)

export const ProjectCard = ({ project, className, variant }: ProjectCardProps) => {
  const { id, title, imageURL, authorName } = project
  const {
    base,
    imageWrapper,
    footer,
    authorGroup,
    avatarIcon,
    authorName: authorNameStyles,
    trophyIcon,
  } = projectCardVariants({ variant })

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

      <div className={footer()}>
        <div className={authorGroup()}>
          <UserIcon className={avatarIcon()} size={16} />
          <span className={authorNameStyles()}>{authorName}</span>
        </div>
        <TrophyIcon className={trophyIcon()} size={18} />
      </div>
    </Link>
  )
}
