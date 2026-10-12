import { cn, type GalleryImage, getAspectRatio } from "../../utils"
import { ImageLightbox } from "../ImageLightbox/ImageLightbox"
import { LazyImage } from "../LazyImage/LazyImage"

export type { GalleryImage }

/**
 * Props for the {@link ImageGallery} component.
 */
export interface ImageGalleryProps {
  images: GalleryImage[]
  /**
   * The widest the gallery gets, in px. Used for each image's `sizes`.
   */
  maxWidth?: number
  className?: string
}

/**
 * Justified row height from the `md` breakpoint up, in px
 */
const ROW_HEIGHT = 200

const TILE_CLASS_NAME = "overflow-hidden rounded-xl bg-gray-100"

const Tile = ({ image, sizes, cover }: { image: GalleryImage; sizes: string; cover?: boolean }) => (
  <ImageLightbox alt={image.alt} height={image.height} src={image.src} width={image.width}>
    <LazyImage
      alt=""
      className={cover ? "object-cover!" : undefined}
      containerClassName="size-full"
      fill
      focalPoint={image}
      sizes={sizes}
      src={image.src}
    />
  </ImageLightbox>
)

/**
 * Shows images of any shape without cropping them badly. The layout depends on the images:
 * - one image fills the width at its own shape, up to 70% of the viewport height
 * - only portrait images use a grid of poster tiles, cropped around each focal point
 * - anything else uses justified rows, where each row has one height and no image is cropped
 *
 * Every image opens uncropped in an {@link ImageLightbox}.
 */
export const ImageGallery = ({ images, maxWidth = 768, className }: ImageGalleryProps) => {
  const [first] = images
  if (!first) return null

  if (images.length === 1) {
    const ratio = getAspectRatio(first)
    return (
      <div
        className={cn("mx-auto w-full", TILE_CLASS_NAME, className)}
        // Caps the height at 70vh by narrowing the box, so the image keeps its shape
        style={{ aspectRatio: ratio, maxWidth: `calc(70vh * ${ratio})` }}
      >
        <Tile image={first} sizes={`(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`} />
      </div>
    )
  }

  if (images.every((image) => getAspectRatio(image) < 1)) {
    return (
      <div className={cn("grid w-full grid-cols-2 gap-2 md:grid-cols-3", className)}>
        {images.map((image) => (
          <div className={cn("aspect-2/3", TILE_CLASS_NAME)} key={image.id}>
            <Tile
              cover
              image={image}
              sizes={`(min-width: ${maxWidth}px) ${Math.round(maxWidth / 3)}px, 50vw`}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        // The md row height must match ROW_HEIGHT
        "flex w-full flex-wrap gap-2 [--row-height:140px] md:[--row-height:200px]",
        className,
      )}
    >
      {images.map((image) => {
        const ratio = getAspectRatio(image)
        return (
          <div
            className={TILE_CLASS_NAME}
            key={image.id}
            // Growing in proportion to the ratio gives every tile in a row the same height
            style={{
              aspectRatio: ratio,
              flexBasis: `calc(var(--row-height) * ${ratio})`,
              flexGrow: ratio,
            }}
          >
            <Tile
              cover
              image={image}
              // A tile grows past the row height to fill its row, by up to about 2 times
              sizes={`(min-width: ${maxWidth}px) ${Math.min(maxWidth, Math.round(ratio * ROW_HEIGHT * 2))}px, 100vw`}
            />
          </div>
        )
      })}
      {/* Stops the last row stretching one image to full width */}
      {images.length > 2 && <div aria-hidden="true" className="grow-10" />}
    </div>
  )
}
