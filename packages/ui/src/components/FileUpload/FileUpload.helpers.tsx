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
  if (bytes < 1024 * 1024) return `${Number((bytes / 1024).toFixed(1))} KB`
  return `${Number((bytes / (1024 * 1024)).toFixed(1))} MB`
}

/**
 * Turns an `accept` string into a readable list, e.g. `"image/png,.pdf"` → `"PNG, PDF"`.
 */
export const formatAccept = (accept: string) =>
  accept
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean)
    .map((token) => {
      if (token.startsWith(".")) return token.slice(1).toUpperCase()
      const [type, subtype] = token.split("/")
      if (subtype === "*") return `${type.charAt(0).toUpperCase()}${type.slice(1)} files`
      return subtype.split("+")[0].toUpperCase()
    })
    .join(", ")
