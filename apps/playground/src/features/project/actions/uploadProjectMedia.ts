"use server"

import { ValidationError } from "payload"
import sharp from "sharp"
import { getCurrentMember } from "@/features/member/member.queries"
import { MEDIA_MAX_BYTES, MEDIA_TYPES } from "@/features/project/project.constants"
import { Slugs } from "@/lib/payload"
import { getPayloadClient } from "@/lib/payload/getPayloadClient"
import type { Media } from "@/payload/payload-types"

export type UploadMediaResult =
  | {
      ok: true
      id: Media["id"]
      url: Media["url"]
      width: Media["width"] | null
      height: Media["height"] | null
    }
  | { ok: false; error: "invalid" | "unauthenticated" | "unavailable" | "server" }

/**
 * The MIME type from the file's content, as the client's `file.type` can be anything. `null` when
 * it is not one of `MEDIA_TYPES`.
 */
const detectImageType = async (data: Buffer): Promise<string | null> => {
  const { format, compression } = await sharp(data)
    .metadata()
    .catch(() => ({ format: undefined, compression: undefined }))
  // sharp reports AVIF as HEIF with AV1 compression
  const type = format === "heif" && compression === "av1" ? "image/avif" : `image/${format}`
  return MEDIA_TYPES.includes(type) ? type : null
}

/**
 * Uploads one image for the signed-in member's project
 *
 * @param formData `file`, and an optional `alt` that defaults to the file name
 */
export async function uploadProjectMedia(formData: FormData): Promise<UploadMediaResult> {
  const file = formData.get("file")
  if (!(file instanceof File) || file.size > MEDIA_MAX_BYTES) {
    return { ok: false, error: "invalid" }
  }
  const alt = formData.get("alt")

  try {
    const current = await getCurrentMember()
    if (current.status !== "authenticated") return { ok: false, error: current.status }

    const data = Buffer.from(await file.arrayBuffer())
    const mimetype = await detectImageType(data)
    if (!mimetype) return { ok: false, error: "invalid" }

    const payload = await getPayloadClient()
    const media = await payload.create({
      collection: Slugs.Collections.MEDIA,
      data: {
        alt: typeof alt === "string" && alt.trim() ? alt.trim() : file.name.replace(/\.[^.]+$/, ""),
      },
      file: {
        data,
        mimetype,
        name: file.name,
        size: file.size,
      },
      overrideAccess: true,
    })
    if (!media.url) throw new Error(`Media ${media.id} has no URL`)

    return {
      ok: true,
      id: media.id,
      url: media.url,
      width: media.width ?? null,
      height: media.height ?? null,
    }
  } catch (error) {
    // Payload refuses some file names, e.g. `.php`, whatever the content
    if (error instanceof ValidationError) return { ok: false, error: "invalid" }
    console.error("[uploadMedia] Failed to upload the image", { error })
    return { ok: false, error: "server" }
  }
}
