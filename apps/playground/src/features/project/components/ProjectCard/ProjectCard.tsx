import { UserIcon } from "@heroicons/react/24/outline"
import { LazyImage } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import Link from "next/link"
import AwardIcon from "@/features/project/components/AwardIcon/AwardIcon"
import { LikeButton } from "@/features/project/components/LikeButton/LikeButton"
import { Routes } from "@/lib/routes"
import { type ProjectCardVariants, projectCardVariants } from "./ProjectCard.variants"

export interface Project {
  id: string
  title: string
  imageURL?: string
  authorName: string
  likes: number
  liked?: boolean
  awardType?: string
}

interface ProjectCardProps extends ProjectCardVariants {
  project: Project
  className?: string
}

export const ProjectCard = ({ project, className, variant }: ProjectCardProps) => {
  const { id, title, imageURL, authorName, likes, liked } = project
  const {
    base,
    imageWrapper,
    overlay,
    title: titleStyles,
    footer,
    authorGroup,
    avatarIcon,
    authorName: authorNameStyles,
    statsGroup,
    awardIcon,
    likesGroup,
    heartIcon,
    likesCount,
  } = projectCardVariants({ variant })

  return (
    // Only the image links, as the like button cannot sit inside a link
    <div className={base({ className })}>
      <Link className={imageWrapper()} href={Routes.PROJECTS.ID(id)}>
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

        <div className={overlay()}>
          <span className={titleStyles()}>{title}</span>
        </div>
      </Link>

      <div className={footer()}>
        <div className={authorGroup()}>
          <UserIcon aria-hidden="true" className={cn(avatarIcon(), "h-4.5 w-4.5")} />
          <span className={authorNameStyles()}>{authorName}</span>
        </div>

        <div className={statsGroup()}>
          {project.awardType && <AwardIcon className={cn(awardIcon(), "h-4.5 w-4.5")} />}
          <LikeButton
            className={likesGroup()}
            countClassName={likesCount()}
            iconClassName={cn(heartIcon(), "h-4 w-4")}
            isLiked={liked}
            likes={likes}
            projectID={id}
          />
        </div>
      </div>
    </div>
  )
}
