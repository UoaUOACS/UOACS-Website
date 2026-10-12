import { LazyImage } from "@uoacs/ui"
import { compactBlockVariants } from "./BlockViews.variants"

export interface BlockImage {
  id: string
  url: string
  alt: string
}

export interface ImageGridBlockViewProps {
  images: BlockImage[]
  /**
   * Show one fixed-height row with the first few thumbnails, for reorder mode
   */
  compact?: boolean
}

const COMPACT_THUMBNAILS = 3

export const ImageGridBlockView = ({ images, compact }: ImageGridBlockViewProps) => {
  if (!compact) {
    return (
      <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3">
        {images.map((image) => (
          <LazyImage
            alt={image.alt}
            className="object-cover!"
            containerClassName="aspect-square w-full overflow-hidden rounded-xl bg-gray-100"
            fill
            key={image.id}
            // The page column is at most 768px wide
            sizes="(min-width: 768px) 256px, 50vw"
            src={image.url}
          />
        ))}
      </div>
    )
  }

  const { base, content, thumbnail } = compactBlockVariants()
  const hidden = images.length - COMPACT_THUMBNAILS
  return (
    <div className={base()}>
      <div className={content()}>
        {images.slice(0, COMPACT_THUMBNAILS).map((image) => (
          <LazyImage
            alt={image.alt}
            className="object-cover!"
            containerClassName={thumbnail()}
            fill
            key={image.id}
            sizes="40px"
            src={image.url}
          />
        ))}
        {hidden > 0 && <span className="text-gray-500">+{hidden}</span>}
      </div>
    </div>
  )
}
