import { HeartIcon, TrophyIcon, UserIcon } from "@heroicons/react/24/outline"
import { LazyImage } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import Link from "next/link"
import { formatLikes } from "@/features/project/helpers/format"
import { Routes } from "@/lib/routes"
import { type ProjectCardVariants, projectCardVariants } from "./ProjectCard.variants"

export interface Project {
  id: string
  title: string
  imageURL?: string
  authorName: string
  likes: number
}

interface ProjectCardProps extends ProjectCardVariants {
  project: Project
  className?: string
}

export const ProjectCard = ({ project, className, variant }: ProjectCardProps) => {
  const { id, title, imageURL, authorName, likes } = project
  const {
    base,
    imageWrapper,
    footer,
    authorGroup,
    avatarIcon,
    authorName: authorNameStyles,
    statsGroup,
    trophyIcon,
    likesGroup,
    heartIcon,
    likesCount,
  } = projectCardVariants({ variant })

  return (
    <Link className={base({ className })} href={Routes.PROJECTS.ID(id)}>
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
          <UserIcon aria-hidden="true" className={cn(avatarIcon(), "h-4.5 w-4.5")} />
          <span className={authorNameStyles()}>{authorName}</span>
        </div>

        <div className={statsGroup()}>
          <TrophyIcon aria-hidden="true" className={cn(trophyIcon(), "h-4.5 w-4.5")} />
          <div className={likesGroup()}>
            <HeartIcon aria-hidden="true" className={cn(heartIcon(), "h-3.5 w-3.5")} />
            <span className={likesCount()}>{formatLikes(likes)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
