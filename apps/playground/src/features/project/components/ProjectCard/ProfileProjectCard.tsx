import { HeartIcon } from "@heroicons/react/24/outline"
import { LazyImage } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import Link from "next/link"
import AwardIcon from "@/features/project/components/AwardIcon/AwardIcon"
import { formatLikes } from "@/features/project/helpers/format"
import { Routes } from "@/lib/routes"
import type { ProjectCardVariantProps } from "./ProjectCard.types"
import { projectCardVariants } from "./ProjectCard.variants"

export const ProfileProjectCard = ({ project, className }: ProjectCardVariantProps) => {
  const { id, title, imageURL, likes, awardType, summary, awardEvent } = project
  const {
    base,
    imageWrapper,
    title: titleStyles,
    awardIcon,
    likesGroup,
    heartIcon,
    likesCount,
    content,
    description,
    awardGroup,
    awardTitle,
    awardSubtitle,
  } = projectCardVariants({ variant: "profile" })

  return (
    <Link className={base({ className })} href={Routes.PROJECTS.ID(id)}>
      <div className={imageWrapper()}>
        {imageURL ? (
          <LazyImage
            alt={title}
            className="object-cover!"
            containerClassName="h-full w-full"
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            src={imageURL}
          />
        ) : null}
      </div>

      <div className={content()}>
        {awardType ? (
          <div className={awardGroup()}>
            <AwardIcon className={awardIcon()} />
            <div>
              <p className={awardTitle()}>{awardType}</p>
              {awardEvent ? <p className={awardSubtitle()}>Awarded at {awardEvent}</p> : null}
            </div>
          </div>
        ) : null}
        <div className="lg:row-start-2">
          <h3 className={titleStyles()}>{title}</h3>
          {summary ? <p className={description()}>{summary}</p> : null}
        </div>
        <div className={cn(likesGroup(), "lg:row-start-3 lg:self-end")}>
          <HeartIcon aria-hidden="true" className={heartIcon()} />
          <span className={likesCount()}>{formatLikes(likes)}</span>
        </div>
      </div>
    </Link>
  )
}
