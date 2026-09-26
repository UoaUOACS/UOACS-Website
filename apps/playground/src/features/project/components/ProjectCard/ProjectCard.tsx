import { LazyImage } from "@uoacs/ui"
import Link from "next/link"
import { formatLikes } from "../../helpers/format"
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

const HeartIcon = ({ className, size = 18 }: IconProps) => (
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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)

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
          <UserIcon className={avatarIcon()} size={18} />
          <span className={authorNameStyles()}>{authorName}</span>
        </div>

        <div className={statsGroup()}>
          <TrophyIcon className={trophyIcon()} size={18} />
          <div className={likesGroup()}>
            <HeartIcon className={heartIcon()} size={14} />
            <span className={likesCount()}>{formatLikes(likes)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
