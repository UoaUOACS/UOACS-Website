"use client"

import { ImageUpload, type ImageUploadProps } from "@uoacs/ui"
import { useRef, useState } from "react"
import { useFlushOnSubmit } from "../flush"
import { getFieldError, useFieldContext } from "../formContext"

export type UploadResult =
  | { ok: true; id: string; url?: string | null }
  | { ok: false; message?: string }

export interface ImageUploadFieldProps
  extends Omit<ImageUploadProps, "value" | "onChange" | "onBlur" | "error" | "busy" | "accept"> {
  /**
   * Uploads the `file` in the form data and returns the saved image's ID
   */
  upload: (formData: FormData) => Promise<UploadResult>
  /**
   * MIME types to accept, checked when a file is picked
   */
  types: string[]
  maxBytes: number
}

/**
 * Uploads the picked image at once and stores its ID, so the form only holds IDs
 */
export const ImageUploadField = ({
  upload,
  types,
  maxBytes,
  src,
  ...props
}: ImageUploadFieldProps) => {
  const field = useFieldContext<string | null>()
  const [file, setFile] = useState<File | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string>()
  const [busy, setBusy] = useState(false)
  const [uploadError, setUploadError] = useState<string>()
  // Submit waits for this, so it does not save the previous image ID
  const pendingUpload = useRef<Promise<void>>(undefined)
  useFlushOnSubmit(field.form, () => pendingUpload.current)

  const handleChange = async (picked: File) => {
    if (!types.includes(picked.type)) {
      setUploadError("This file type is not supported")
      return
    }
    if (picked.size > maxBytes) {
      setUploadError(`Choose an image under ${Math.floor(maxBytes / 1024 / 1024)} MB`)
      return
    }
    setUploadError(undefined)
    setFile(picked)
    setBusy(true)
    try {
      const formData = new FormData()
      formData.set("file", picked)
      const result = await upload(formData)
      if (result.ok) {
        setUploadedUrl(result.url ?? undefined)
        field.handleChange(result.id)
      } else {
        setFile(null)
        setUploadError(result.message ?? "The image could not be uploaded. Try again.")
      }
    } catch (error) {
      console.error("[ImageUploadField] upload failed", { error })
      setFile(null)
      setUploadError("The image could not be uploaded. Try again.")
    } finally {
      setBusy(false)
      field.handleBlur()
    }
  }

  return (
    <ImageUpload
      {...props}
      accept={types.join(",")}
      busy={busy}
      error={uploadError ?? getFieldError(field.state.meta.errors)}
      onChange={(picked) => {
        pendingUpload.current = handleChange(picked)
      }}
      src={uploadedUrl ?? src}
      value={file}
    />
  )
}
