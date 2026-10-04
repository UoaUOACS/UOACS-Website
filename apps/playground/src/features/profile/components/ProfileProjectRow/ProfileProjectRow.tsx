import { HeartIcon } from "@heroicons/react/24/outline"
import { LazyImage } from "@uoacs/ui"
import Link from "next/link"
import type { ProfileProject } from "@/features/profile/types"
import AwardIcon from "@/features/project/components/AwardIcon/AwardIcon"
import { formatLikes } from "@/features/project/helpers/format"
import { Routes } from "@/lib/routes"

interface ProfileProjectRowProps {
  project: ProfileProject
}

export const ProfileProjectRow = ({ project }: ProfileProjectRowProps) => {
  const { id, title, description, imageURL, likes, award } = project

  return (
    <article className="flex w-full flex-col gap-6 md:flex-row md:flex-wrap md:gap-16 lg:flex-nowrap">
      <Link
        className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-2xl bg-gray-100 md:w-120"
        href={Routes.PROJECTS.ID(id)}
      >
        {imageURL && (
          <LazyImage
            alt={title}
            className="object-cover!"
            containerClassName="h-full w-full"
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            src={imageURL}
          />
        )}
      </Link>

      <div className="flex grow flex-col gap-4 md:pt-36">
        <h2 className="font-semibold text-2xl text-pink-500">
          <Link href={Routes.PROJECTS.ID(id)}>{title}</Link>
        </h2>
        <p className="text-2xl">{description}</p>
        <p className="mt-auto flex items-center gap-2 text-gray-500">
          <HeartIcon aria-hidden="true" className="size-6 stroke-2 text-black" />
          <span className="sr-only">Likes:</span>
          {formatLikes(likes)}
        </p>
      </div>

      {award && (
        <div className="flex shrink-0 gap-3 md:pt-10 lg:w-90">
          <AwardIcon className="size-8 shrink-0" />
          <div>
            <p className="font-medium text-2xl">{award.title}</p>
            <p className="text-gray-400 text-lg">Awarded at {award.event}</p>
          </div>
        </div>
      )}
    </article>
  )
}
