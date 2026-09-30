"use client"

import { shuffle } from "@uoacs/shared"
import { cn } from "@uoacs/ui/utils"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export interface DiscordAvatarMember {
  id: string
  username: string
  avatar_url: string
}

export interface DiscordAvatarsProps {
  /**
   * Members to sample avatars from.
   */
  members: DiscordAvatarMember[]
}

const AVATAR_SIZE = 32
const AVATAR_OVERLAP = 12
const AVATAR_STEP = AVATAR_SIZE - AVATAR_OVERLAP
const AVATAR_MIN_VISIBLE_COUNT = 4
const AVATAR_MAX_COUNT = 8

/**
 * A row of overlapping Discord member avatars that shows as many as fit in its container.
 * The sample is shuffled after hydration so the server-rendered markup stays deterministic.
 *
 * @param members Members to sample avatars from.
 */
export const DiscordAvatars = ({ members }: DiscordAvatarsProps) => {
  const [avatarMembers, setAvatarMembers] = useState(() => members.slice(0, AVATAR_MAX_COUNT))
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    setAvatarMembers(shuffle(members).slice(0, AVATAR_MAX_COUNT))
  }, [members])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateVisibleCount = () => {
      const width = container.clientWidth
      const fitCount = width < AVATAR_SIZE ? 0 : Math.floor((width - AVATAR_SIZE) / AVATAR_STEP) + 1
      const count = fitCount < AVATAR_MIN_VISIBLE_COUNT ? 0 : fitCount
      setVisibleCount(Math.max(0, Math.min(avatarMembers.length, count)))
    }

    updateVisibleCount()
    const observer = new ResizeObserver(updateVisibleCount)
    observer.observe(container)
    return () => observer.disconnect()
  }, [avatarMembers.length])

  if (avatarMembers.length === 0) return null

  return (
    <div
      className="flex flex-1 flex-row justify-center overflow-hidden md:w-full md:flex-none md:justify-start"
      ref={containerRef}
    >
      {avatarMembers.slice(0, visibleCount).map((member, i) => (
        <Image
          alt={member.username}
          className={cn("h-8 w-8 rounded-full border-2 border-gray-800", i > 0 && "-ml-3")}
          height={AVATAR_SIZE}
          key={member.id}
          src={member.avatar_url}
          style={{ zIndex: avatarMembers.length - i }}
          width={AVATAR_SIZE}
        />
      ))}
    </div>
  )
}
