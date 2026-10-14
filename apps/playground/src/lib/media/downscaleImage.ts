const WEBP_QUALITY = 0.85

/**
 * Scales an image down so its longest side is `maxDimension` or less, and encodes it as WebP.
 * Returns the original file if the browser cannot decode it, or if the result is not smaller.
 */
export const downscaleImage = async (file: File, maxDimension: number): Promise<File> => {
  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    return file
  }

  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", WEBP_QUALITY),
  )
  // Some browsers encode PNG when they cannot encode WebP
  if (blob?.type !== "image/webp" || blob.size >= file.size) return file
  return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.webp`, { type: "image/webp" })
}
