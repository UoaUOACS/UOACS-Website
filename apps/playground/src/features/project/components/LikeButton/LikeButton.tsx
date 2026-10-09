"use client"

import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid"
import { useDebouncedCallback } from "@tanstack/react-pacer"
import { AuthPages, authPageUrl } from "@uoacs/shared"
import { Button } from "@uoacs/ui"
import { toast } from "@uoacs/ui/toast"
import { cn } from "@uoacs/ui/utils"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"
import { setLike } from "@/features/project/actions/setLike"
import { formatLikes } from "@/features/project/helpers/format"

interface LikeState {
  isLiked: boolean
  likes: number
}

const withLiked = (state: LikeState, liked: boolean): LikeState =>
  state.isLiked === liked ? state : { isLiked: liked, likes: state.likes + (liked ? 1 : -1) }

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
  const [wantedState, setWantedState] = useState<boolean | null>(null)
  const shown = wantedState === null ? saved : withLiked(saved, wantedState)
  const lastSent = useRef<boolean | null>(isLiked)
  const heartRef = useRef<HTMLSpanElement>(null)
  const pathname = usePathname()

  const send = async (liked: boolean) => {
    if (liked === lastSent.current) return
    lastSent.current = liked

    const revert = () => {
      lastSent.current = null
      setWantedState((current) => (current === liked ? null : current))
    }

    try {
      const result = await setLike(projectID, liked)
      if (result.ok) {
        setSaved((state) => withLiked(state, result.liked))
        return
      }
      revert()
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
      revert()
      console.error("[LikeButton] like request failed", { error: err })
      toast.error({ description: "Something went wrong. Try again." })
    }
  }

  const save = useDebouncedCallback((liked: boolean) => void send(liked), {
    wait: 400,
    onUnmount: (debouncer) => debouncer.flush(),
  })

  const handleClick = () => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      heartRef.current?.animate([{ scale: 1 }, { scale: 0.8 }, { scale: 1.2 }, { scale: 1 }], {
        duration: 400,
        easing: "ease-out",
      })
    }
    const liked = !shown.isLiked
    setWantedState(liked)
    save(liked)
  }

  return (
    <button
      aria-label={shown.isLiked ? "Unlike project" : "Like project"}
      aria-pressed={shown.isLiked}
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
              shown.isLiked && "opacity-0",
            )}
          />
          <HeartSolidIcon
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-200",
              iconClassName,
              "text-red-500",
              !shown.isLiked && "opacity-0",
            )}
          />
        </span>
      </span>
      <span className={countClassName}>{formatLikes(shown.likes)}</span>
    </button>
  )
}
