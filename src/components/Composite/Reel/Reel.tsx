"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Reel as ReelType } from "@/payload/payload-types"

/**
 * Props for the {@link Reel} component.
 */
export interface ReelProps {
  /**
   * The {@link ReelType} data including video and description.
   */
  reel: ReelType
}

/**
 * A component that displays an Instagram reel style video with description overlay.
 *
 * @param {ReelType} reel The reel data including video and description.
 * @returns The rendered Reel component.
 */
export const Reel = ({ reel }: ReelProps) => {
  const src = typeof reel.video === "string" ? reel.video : reel.video?.url || ""

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  return (
    <div className="relative aspect-9/16 w-64 cursor-pointer overflow-hidden rounded-xl md:w-72">
      <video
        aria-label={`Instagram Reel: ${reel.description}`}
        autoPlay
        className="absolute inset-0 h-full w-full cursor-default object-cover"
        loop
        muted
        playsInline
        src={src}
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent",
        )}
      />

      <div className="absolute bottom-0 left-0 p-4">
        <a
          aria-label="Visit our Instagram Page @uoacs25"
          className="mb-2 flex items-center gap-2 p-0 font-semibold text-sm text-white drop-shadow-md"
          href="https://www.instagram.com/uoacs25/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            alt="UOACS Logo"
            className="size-8 rounded-full object-cover"
            height={32}
            src="/uoacs-icon.svg"
            width={32}
          />
          <span>uoacs25</span>
        </a>
        <button
          className={cn(
            "w-full cursor-pointer text-left text-sm text-white drop-shadow-md transition-all duration-300 ease-in-out",
            isDescriptionExpanded ? "line-clamp-none" : "line-clamp-2",
          )}
          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          type="button"
        >
          {reel.description}
        </button>
      </div>
    </div>
  )
}
