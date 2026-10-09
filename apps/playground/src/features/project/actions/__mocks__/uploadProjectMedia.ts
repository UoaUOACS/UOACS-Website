import type { UploadMediaResult } from "../uploadProjectMedia"

export async function uploadProjectMedia(formData: FormData): Promise<UploadMediaResult> {
  const file = formData.get("file")
  return {
    ok: true,
    id: "000000000000000000000002",
    url: file instanceof File ? URL.createObjectURL(file) : "https://placehold.co/800x600",
    width: 800,
    height: 600,
  }
}
