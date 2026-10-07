"use client"

import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"
import { AuthPages, authPageUrl } from "@uoacs/shared"
import { Button } from "@uoacs/ui"
import { toast } from "@uoacs/ui/toast"
import { cn } from "@uoacs/ui/utils"
import { usePathname } from "next/navigation"
import { useOptimistic, useRef, useState, useTransition } from "react"
import { toggleLike } from "@/features/project/actions/toggleLike"
import { formatLikes } from "@/features/project/helpers/format"

interface LikeButtonProps {
  projectID: string
  likes: number
  isLiked?: boolean
  className?: string
  iconClassName?: string
  countClassName?: string
}

export const LikeButton = ({
  projectID,
  likes,
  isLiked = false,
  className,
  iconClassName,
  countClassName,
}: LikeButtonProps) => {
  // The cached count can lag behind a like, so keep the saved state here rather than in props
  const [saved, setSaved] = useState({ isLiked, likes })
  const [optimistic, toggleOptimistic] = useOptimistic(saved, (state) => ({
    isLiked: !state.isLiked,
    likes: state.likes + (state.isLiked ? -1 : 1),
  }))
  const [, startTransition] = useTransition()
  const heartRef = useRef<HTMLSpanElement>(null)
  const pathname = usePathname()

  const handleClick = () => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      heartRef.current?.animate([{ scale: 1 }, { scale: 0.8 }, { scale: 1.2 }, { scale: 1 }], {
        duration: 400,
        easing: "ease-out",
      })
    }
    startTransition(async () => {
      toggleOptimistic(null)
      try {
        const result = await toggleLike(projectID)
        if (result.ok) {
          // Updates after an await need their own transition to land with the optimistic state
          startTransition(() =>
            setSaved((state) =>
              state.isLiked === result.liked
                ? state
                : { isLiked: result.liked, likes: state.likes + (result.liked ? 1 : -1) },
            ),
          )
          return
        }
        if (result.reason === "unauthenticated") {
          const loginHref = authPageUrl(
            AuthPages.LOGIN,
            `${process.env.NEXT_PUBLIC_PROJECTS_URL}${pathname}`,
          )
          toast.error({
            description: result.error,
            action: (
              <a href={loginHref}>
                <Button size="sm">Log In</Button>
              </a>
            ),
          })
          return
        }
        console.error("[LikeButton] like was not saved", { error: result.error })
        toast.error({ description: result.error })
      } catch (err) {
        console.error("[LikeButton] like request failed", { error: err })
        toast.error({ description: "Something went wrong. Try again." })
      }
    })
  }

  return (
    <button
      aria-label={optimistic.isLiked ? "Unlike project" : "Like project"}
      aria-pressed={optimistic.isLiked}
      className={cn("group/like cursor-pointer", className)}
      onClick={handleClick}
      type="button"
    >
      <span
        aria-hidden="true"
        className="block transition-transform duration-200 group-hover/like:scale-110"
      >
        <span className="grid" ref={heartRef}>
          <HeartOutlineIcon
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-200",
              iconClassName,
              optimistic.isLiked && "opacity-0",
            )}
          />
          <HeartSolidIcon
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-200",
              iconClassName,
              "text-red-500",
              !optimistic.isLiked && "opacity-0",
            )}
          />
        </span>
      </span>
      <span className={countClassName}>{formatLikes(optimistic.likes)}</span>
    </button>
  )
}
