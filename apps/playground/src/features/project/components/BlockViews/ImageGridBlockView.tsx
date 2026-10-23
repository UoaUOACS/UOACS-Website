import { type GalleryImage, ImageGallery, LazyImage } from "@uoacs/ui"
import type { ReactNode } from "react"
import { compactBlockVariants } from "./BlockViews.variants"

export interface ImageGridBlockViewProps {
  images: GalleryImage[]
  /**
   * Show one fixed-height row with the first few thumbnails, for reorder mode
   */
  compact?: boolean
  /**
   * Shown before the content in the compact row, e.g. a drag handle
   */
  leading?: ReactNode
}

const COMPACT_THUMBNAILS = 3

export const ImageGridBlockView = ({ images, compact, leading }: ImageGridBlockViewProps) => {
  if (!compact) {
    return (
      // A wrapper, as the single-image layout sets its own inline max-width
      <div className="mx-auto w-full max-w-5xl">
        <ImageGallery images={images} maxWidth={1024} />
      </div>
    )
  }

  const { base, content, thumbnail } = compactBlockVariants()
  const hidden = images.length - COMPACT_THUMBNAILS
  return (
    <div className={base()}>
      {leading}
      <div className={content()}>
        {images.slice(0, COMPACT_THUMBNAILS).map((image) => (
          <LazyImage
            alt={image.alt}
            className="object-cover!"
            containerClassName={thumbnail()}
            fill
            key={image.id}
            sizes="40px"
            src={image.src}
          />
        ))}
        {hidden > 0 && <span className="text-gray-500">+{hidden}</span>}
      </div>
    </div>
  )
}
