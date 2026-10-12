import { type CollectionBeforeValidateHook, type CollectionConfig, ValidationError } from "payload"

type UploadOptions = Extract<CollectionConfig["upload"], object>

/**
 * Longest side, in px, that an image upload is stored at
 */
export const IMAGE_MAX_DIMENSION = 2560

/**
 * Re-encodes each image with sharp. This applies the EXIF rotation, so the stored width and height
 * are correct, and it removes metadata such as GPS location.
 */
export const imageResizeOptions: UploadOptions["resizeOptions"] = {
  width: IMAGE_MAX_DIMENSION,
  height: IMAGE_MAX_DIMENSION,
  fit: "inside",
  withoutEnlargement: true,
}

interface ImageDimensionLimits {
  /**
   * Smallest allowed short side, in px
   */
  minSide: number
  /**
   * Largest allowed long side divided by short side
   */
  maxRatio: number
}

/**
 * Rejects new images that are too small or too narrow to show well. Payload sets `width` and
 * `height` before this hook runs, and the file reaches storage only after it passes.
 */
export const makeImageDimensionsHook =
  ({ minSide, maxRatio }: ImageDimensionLimits): CollectionBeforeValidateHook =>
  ({ data, operation, req, collection }) => {
    if (operation !== "create" || !req.file) return data
    const { width, height } = data ?? {}
    if (typeof width !== "number" || typeof height !== "number") return data

    const short = Math.min(width, height)
    const message =
      short < minSide
        ? `The image is ${width}×${height} px. Both sides must be at least ${minSide} px.`
        : Math.max(width, height) / short > maxRatio
          ? `The image is ${width}×${height} px. The long side can be at most ${maxRatio} times the short side.`
          : null
    if (message) {
      throw new ValidationError({
        collection: collection.slug,
        errors: [{ message, path: "file" }],
      })
    }
    return data
  }
