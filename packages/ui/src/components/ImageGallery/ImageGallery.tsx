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
 * Most columns in the span grid, from the `md` breakpoint up
 */
const MAX_COLUMNS = 4

/**
 * Columns an image spans in the span grid: 1 for portrait or square, 2 for landscape and 4 for
 * panoramas, so each cell is close to the image's shape
 */
const getSpan = (ratio: number) => (ratio >= 2.4 ? 4 : ratio >= 1.2 ? 2 : 1)

/**
 * Empty cells left when the grid places each image in the first row with room for it, as
 * `grid-auto-flow: dense` does
 */
const countEmptyCells = (spans: number[], columns: number) => {
  const space: number[] = []
  for (const span of spans) {
    const width = Math.min(span, columns)
    const row = space.findIndex((free) => free >= width)
    if (row === -1) space.push(columns - width)
    else space[row] = (space[row] ?? 0) - width
  }
  return space.reduce((sum, free) => sum + free, 0)
}

/**
 * 3 or 4 columns, whichever leaves fewer empty cells. 2 would make every image too big.
 */
const getColumns = (spans: number[]) => {
  let best = MAX_COLUMNS
  for (let columns = MAX_COLUMNS - 1; columns >= 3; columns--) {
    if (countEmptyCells(spans, columns) < countEmptyCells(spans, best)) best = columns
  }
  return best
}

// Phones always have 2 columns
const SPAN_CLASS_NAMES: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-2 md:col-span-3",
  4: "col-span-2 md:col-span-4",
}

const COLUMN_CLASS_NAMES: Record<number, string> = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
}

const TILE_CLASS_NAME = "overflow-hidden rounded-xl bg-gray-100"

interface TileProps {
  images: GalleryImage[]
  index: number
  sizes: string
  cover?: boolean
}

const Tile = ({ images, index, sizes, cover }: TileProps) => {
  const image = images[index]
  if (!image) return null
  return (
    <ImageLightbox images={images} index={index}>
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
}

/**
 * Shows images of any shape without cropping them badly. The layout depends on the images:
 * - one image fills the width at its own shape, up to 70% of the viewport height
 * - only portrait images use a grid of poster tiles, cropped around each focal point
 * - anything else uses a grid where landscape images span 2 columns, cropped slightly around each
 *   focal point. Images may move to fill gaps.
 *
 * Every image opens uncropped in an {@link ImageLightbox}, which steps through the whole gallery.
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
        <Tile images={images} index={0} sizes={`(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`} />
      </div>
    )
  }

  if (images.every((image) => getAspectRatio(image) < 1)) {
    return (
      <div className={cn("grid w-full grid-cols-2 gap-2 md:grid-cols-3", className)}>
        {images.map((image, index) => (
          <div className={cn("aspect-2/3", TILE_CLASS_NAME)} key={image.id}>
            <Tile
              cover
              images={images}
              index={index}
              sizes={`(min-width: ${maxWidth}px) ${Math.round(maxWidth / 3)}px, 50vw`}
            />
          </div>
        ))}
      </div>
    )
  }

  const spans = images.map((image) => getSpan(getAspectRatio(image)))
  const columns = getColumns(spans)

  return (
    // Row heights use `cqw`, which measures the nearest container above the grid
    <div className={cn("@container w-full", className)}>
      <div
        className={cn(
          "grid grid-flow-dense grid-cols-2 gap-2",
          // A row is 1.25 column widths tall: 1-column cells are 4:5, 2-column cells about 8:5
          "auto-rows-[calc((100cqw-var(--spacing)*2)/2*1.25)]",
          columns === 3 && "md:auto-rows-[calc((100cqw-var(--spacing)*4)/3*1.25)]",
          columns === 4 && "md:auto-rows-[calc((100cqw-var(--spacing)*6)/4*1.25)]",
          COLUMN_CLASS_NAMES[columns],
        )}
      >
        {images.map((image, index) => {
          const span = Math.min(spans[index] ?? 1, columns)
          return (
            <div className={cn(SPAN_CLASS_NAMES[span], TILE_CLASS_NAME)} key={image.id}>
              <Tile
                cover
                images={images}
                index={index}
                sizes={`(min-width: ${maxWidth}px) ${Math.round((maxWidth * span) / columns)}px, ${span > 1 ? 100 : 50}vw`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
