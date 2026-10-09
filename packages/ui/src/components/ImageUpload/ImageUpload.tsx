"use client"

import { PhotoIcon } from "@heroicons/react/24/outline"
import { type FocusEventHandler, type Ref, useEffect, useId, useState } from "react"
import { cn } from "../../utils"

export interface ImageUploadProps {
  value: File | null
  onChange: (file: File) => void
  onBlur?: FocusEventHandler<HTMLInputElement>
  /**
   * Forwarded to the file input, so a form can focus it.
   */
  ref?: Ref<HTMLInputElement>
  /**
   * Image to show when no file is selected, such as the saved image.
   */
  src?: string
  label?: string
  error?: string
  /**
   * Same syntax as the native `accept` attribute.
   */
  accept?: string
  required?: boolean
  disabled?: boolean
  id?: string
  containerClassName?: string
  className?: string
}

/**
 * Shows an image that the user can click to replace.
 */
export const ImageUpload = ({
  value,
  onChange,
  onBlur,
  ref,
  src,
  label = "Upload image",
  error,
  accept = "image/*",
  required,
  disabled,
  id,
  containerClassName,
  className,
}: ImageUploadProps) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const [fileUrl, setFileUrl] = useState<string>()

  useEffect(() => {
    if (!value) {
      setFileUrl(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(value)
    setFileUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [value])

  const previewUrl = fileUrl ?? src

  return (
    <div className={cn("flex w-full flex-col gap-1", containerClassName)}>
      <label
        className={cn(
          "group/image-upload relative flex aspect-4/3 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-gray-100 focus-within:[outline:-webkit-focus-ring-color_auto_1px]",
          error && "ring-2 ring-red-600",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        htmlFor={inputId}
      >
        {previewUrl ? (
          // biome-ignore lint/performance/noImgElement: src can be any remote host, which next/image needs remotePatterns for
          <img
            alt=""
            className="absolute inset-0 size-full object-cover"
            // Formats like HEIC match `image/*` but most browsers cannot render them
            onError={() => setFileUrl(undefined)}
            src={previewUrl}
          />
        ) : null}
        <span
          className={cn(
            "relative flex flex-col items-center gap-2 text-sm font-medium",
            previewUrl &&
              "absolute inset-0 justify-center bg-black/50 text-white opacity-0 transition-opacity duration-200",
            previewUrl &&
              !disabled &&
              "group-hover/image-upload:opacity-100 group-focus-within/image-upload:opacity-100 pointer-coarse:opacity-100",
            !previewUrl && "text-gray-500",
          )}
        >
          <PhotoIcon aria-hidden className="size-8 stroke-2" />
          {previewUrl ? "Change image" : label}
        </span>
        <input
          accept={accept}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          className="sr-only"
          disabled={disabled}
          id={inputId}
          onBlur={onBlur}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onChange(file)
            e.target.value = ""
          }}
          ref={ref}
          required={required && !previewUrl}
          type="file"
        />
      </label>
      {error && (
        <p className="text-red-600 text-sm" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}
