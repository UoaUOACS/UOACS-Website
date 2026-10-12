"use client"

import Image from "next/image"
import { type ReactNode, useState } from "react"
import { cn } from "../../utils"
import { Dialog } from "../Dialog/Dialog"

/**
 * Props for the {@link ImageLightbox} component.
 */
export interface ImageLightboxProps {
  src: string
  /**
   * Also the dialog title and part of the button's accessible name
   */
  alt: string
  /**
   * The full image's width. Gives the dialog the right shape before the image loads.
   */
  width?: number | null
  height?: number | null
  /**
   * What the user clicks to open the full image, usually a thumbnail
   */
  children: ReactNode
  /**
   * Additional class names for the button around `children`
   */
  className?: string
}

/**
 * Shows the full, uncropped image in a dialog when the user clicks `children`.
 *
 * @example
 * <ImageLightbox src={src} alt={alt} width={1920} height={1080}>
 *   <LazyImage src={src} alt={alt} fill className="object-cover!" />
 * </ImageLightbox>
 */
export const ImageLightbox = ({
  src,
  alt,
  width,
  height,
  children,
  className,
}: ImageLightboxProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        aria-label={`View ${alt}`}
        className={cn("block size-full cursor-zoom-in", className)}
        onClick={() => setOpen(true)}
        type="button"
      >
        {children}
      </button>
      <Dialog className="max-w-5xl" onClose={() => setOpen(false)} open={open} title={alt}>
        <Image
          alt={alt}
          className="mx-auto max-h-[80dvh] w-auto object-contain"
          height={height ?? 1200}
          sizes="100vw"
          src={src}
          width={width ?? 1600}
        />
      </Dialog>
    </>
  )
}
