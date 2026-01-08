"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

/**
 * A component that displays an image with a loading placeholder.
 */
interface LazyImageProps extends ImageProps {
  /**
   * The class name for the container div
   */
  containerClassName?: string
  /**
   * The class name for the skeleton placeholder
   */
  skeletonClassName?: string
}

/**
 * A component that displays an image with a loading placeholder.
 *
 * @param width The width of the image
 * @param height The height of the image
 * @param className The class name for the image
 * @param containerClassName The class name for the container div
 * @param props Other {@link ImageProps}
 */
export function LazyImage({
  width,
  height,
  className,
  containerClassName,
  skeletonClassName,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={cn("relative", containerClassName)} style={{ width, height }}>
      {!isLoaded && (
        <div
          className={cn("absolute inset-0 animate-pulse rounded-lg bg-gray-200", skeletonClassName)}
        />
      )}
      <Image
        className={cn(
          "h-full w-full object-contain transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className,
        )}
        height={height}
        onError={() => {
          setIsLoaded(true)
        }}
        onLoadingComplete={() => {
          setIsLoaded(true)
        }}
        width={width}
        {...props}
      />
    </div>
  )
}
