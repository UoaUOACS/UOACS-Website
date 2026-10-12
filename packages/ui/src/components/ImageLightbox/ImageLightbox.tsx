"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { type ReactNode, useEffect, useState } from "react"
import { cn } from "../../utils"
import { Dialog } from "../Dialog/Dialog"

export interface LightboxImage {
  src: string
  /**
   * Also the dialog title
   */
  alt: string
  /**
   * The full image's width. Gives the dialog the right shape before the image loads.
   */
  width?: number | null
  height?: number | null
}

/**
 * Props for the {@link ImageLightbox} component.
 */
export interface ImageLightboxProps {
  /**
   * Every image the user can step through. Previous and next buttons show when there are 2 or more.
   */
  images: LightboxImage[]
  /**
   * The image that opens first
   */
  index?: number
  /**
   * What the user clicks to open the full image, usually a thumbnail
   */
  children: ReactNode
  /**
   * Additional class names for the button around `children`
   */
  className?: string
}

const NAV_BUTTON_CLASS_NAME =
  "-translate-y-1/2 absolute top-1/2 cursor-pointer rounded-full bg-white/80 p-2 text-gray-900 shadow transition-colors hover:bg-white"

/**
 * Shows full, uncropped images in a dialog when the user clicks `children`. The arrow buttons and
 * arrow keys step through `images`, looping at each end.
 *
 * @example
 * <ImageLightbox images={images} index={2}>
 *   <LazyImage src={images[2].src} alt="" fill className="object-cover!" />
 * </ImageLightbox>
 */
export const ImageLightbox = ({ images, index = 0, children, className }: ImageLightboxProps) => {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(index)
  const image = images[current]
  const hasNav = images.length > 1

  const step = (by: number) => setCurrent((value) => (value + by + images.length) % images.length)

  useEffect(() => {
    if (!open || !hasNav) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") step(-1)
      if (event.key === "ArrowRight") step(1)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  })

  if (!image) return null

  return (
    <>
      <button
        aria-label={`View ${images[index]?.alt ?? image.alt}`}
        className={cn("block size-full cursor-zoom-in", className)}
        onClick={() => {
          setCurrent(index)
          setOpen(true)
        }}
        type="button"
      >
        {children}
      </button>
      <Dialog className="max-w-5xl" onClose={() => setOpen(false)} open={open} title={image.alt}>
        <div className="relative">
          <Image
            alt={image.alt}
            className="mx-auto max-h-[80dvh] w-auto object-contain"
            height={image.height ?? 1200}
            key={image.src}
            sizes="100vw"
            src={image.src}
            width={image.width ?? 1600}
          />
          {hasNav && (
            <>
              <button
                aria-label="Previous image"
                className={cn(NAV_BUTTON_CLASS_NAME, "left-2")}
                onClick={() => step(-1)}
                type="button"
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                aria-label="Next image"
                className={cn(NAV_BUTTON_CLASS_NAME, "right-2")}
                onClick={() => step(1)}
                type="button"
              >
                <ChevronRightIcon className="size-5" />
              </button>
            </>
          )}
        </div>
        {hasNav && (
          <p aria-live="polite" className="text-center text-gray-500 text-sm">
            {current + 1} / {images.length}
          </p>
        )}
      </Dialog>
    </>
  )
}
