export const matchesAccept = (file: File, accept?: string) => {
  if (!accept) return true
  const fileName = file.name.toLowerCase()
  const fileType = file.type.toLowerCase()
  return accept
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
    .some((token) => {
      if (token.startsWith(".")) return fileName.endsWith(token)
      if (token.endsWith("/*")) return fileType.startsWith(token.slice(0, -1))
      return fileType === token
    })
}

export const fileKey = (file: File) => `${file.name}-${file.size}-${file.lastModified}`

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
