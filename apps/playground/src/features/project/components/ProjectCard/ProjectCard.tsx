import { HeartIcon, UserIcon } from "@heroicons/react/24/outline"
import { LazyImage } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import Link from "next/link"
import AwardIcon from "@/features/project/components/AwardIcon/AwardIcon"
import { formatLikes } from "@/features/project/helpers/format"
import { Routes } from "@/lib/routes"
import { type ProjectCardVariants, projectCardVariants } from "./ProjectCard.variants"

export interface Project {
  id: string
  title: string
  imageURL?: string
  authorName: string
  likes: number
  awardType?: string
  summary?: string
  awardEvent?: string
}

interface ProjectCardProps extends ProjectCardVariants {
  project: Project
  className?: string
}

export const ProjectCard = ({ project, className, variant }: ProjectCardProps) => {
  const { id, title, imageURL, authorName, likes, awardType, summary, awardEvent } = project
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
    content,
    description,
    awardGroup,
    awardTitle,
    awardSubtitle,
  } = projectCardVariants({ variant })

  if (variant === "profile") {
    return (
      <Link className={base({ className })} href={Routes.PROJECTS.ID(id)}>
        <div className={imageWrapper()}>
          {imageURL ? (
            <LazyImage
              alt={title}
              className="object-cover!"
              containerClassName="h-full w-full"
              fill
              sizes="400px"
              src={imageURL}
            />
          ) : null}
        </div>

        <div className={content()}>
          <div className="row-start-2">
            <h3 className={titleStyles()}>{title}</h3>
            {summary ? <p className={description()}>{summary}</p> : null}
          </div>
          <div className={cn(likesGroup(), "row-start-3 mb-4 self-end")}>
            <HeartIcon aria-hidden="true" className={cn(heartIcon(), "size-[18px]")} />
            <span className={likesCount()}>{formatLikes(likes)}</span>
          </div>
        </div>

        {awardType ? (
          <div className={awardGroup()}>
            <AwardIcon className={cn(awardIcon(), "size-[31px]")} />
            <div>
              <p className={awardTitle()}>{awardType}</p>
              {awardEvent ? <p className={awardSubtitle()}>Awarded at {awardEvent}</p> : null}
            </div>
          </div>
        ) : null}
      </Link>
    )
  }

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

        <div className={overlay()}>
          <span className={titleStyles()}>{title}</span>
        </div>
      </div>

      <div className={footer()}>
        <div className={authorGroup()}>
          <UserIcon aria-hidden="true" className={cn(avatarIcon(), "h-4.5 w-4.5")} />
          <span className={authorNameStyles()}>{authorName}</span>
        </div>

        <div className={statsGroup()}>
          {awardType && <AwardIcon className={cn(awardIcon(), "h-4.5 w-4.5")} />}
          <div className={likesGroup()}>
            <HeartIcon aria-hidden="true" className={cn(heartIcon(), "h-4 w-4")} />
            <span className={likesCount()}>{formatLikes(likes)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
