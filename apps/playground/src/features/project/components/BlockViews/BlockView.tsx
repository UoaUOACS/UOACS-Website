import { Slugs } from "@/lib/payload"
import type { Project } from "@/payload/payload-types"
import { type BlockImage, ImageGridBlockView } from "./ImageGridBlockView"
import { TextBlockView } from "./TextBlockView"

interface BlockViewProps {
  /**
   * A saved block with its images populated
   */
  block: Project["pageContent"][number]
  compact?: boolean
}

const toBlockImages = (
  images: Extract<BlockViewProps["block"], { blockType: "imageGrid" }>["images"],
) =>
  images.flatMap((image): BlockImage[] =>
    // Skip images that were deleted or not populated
    typeof image === "object" && image.url
      ? [{ id: image.id, url: image.url, alt: image.alt }]
      : [],
  )

export const BlockView = ({ block, compact }: BlockViewProps) => {
  switch (block.blockType) {
    case Slugs.Blocks.TEXT:
      return <TextBlockView compact={compact} content={block.content} />
    case Slugs.Blocks.IMAGE_GRID:
      return <ImageGridBlockView compact={compact} images={toBlockImages(block.images)} />
  }
}
