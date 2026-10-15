const WEBP_QUALITY = 0.85

const scale = async (file: File, maxDimension: number): Promise<File> => {
  const bitmap = await createImageBitmap(file)
  const ratio = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement("canvas")
  canvas.width = Math.round(bitmap.width * ratio)
  canvas.height = Math.round(bitmap.height * ratio)
  const context = canvas.getContext("2d")
  if (!context) {
    bitmap.close()
    return file
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", WEBP_QUALITY),
  )
  // Some browsers encode PNG when they cannot encode WebP
  if (blob?.type !== "image/webp" || blob.size >= file.size) return file
  return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.webp`, { type: "image/webp" })
}

/**
 * Scales an image down so its longest side is `maxDimension` or less, and encodes it as WebP.
 * Returns the original file if the browser cannot decode or encode it, or if the result is not
 * smaller.
 */
export const downscaleImage = async (file: File, maxDimension: number): Promise<File> => {
  try {
    return await scale(file, maxDimension)
  } catch (error) {
    console.warn("[downscaleImage] Uploading the original image", { error, type: file.type })
    return file
  }
}
