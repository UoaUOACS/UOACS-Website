"use client"

import { ArrowUpTrayIcon, DocumentIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { type DragEvent, useEffect, useId, useState } from "react"
import { cn } from "../../utils"
import { fileKey, formatFileSize, matchesAccept } from "./FileUpload.helpers"
import {
  type FileUploadPreviewVariantProps,
  fileUploadPreviewVariants,
} from "./FileUpload.variants"

export type FileRejectionReason = "type" | "size" | "count" | "duplicate"

export interface FileRejection {
  file: File
  reason: FileRejectionReason
}

interface FileUploadBaseProps extends FileUploadPreviewVariantProps {
  value: File[]
  onChange: (files: File[]) => void
  onReject?: (rejections: FileRejection[]) => void
  label?: string
  hint?: string
  error?: string
  /**
   * Same syntax as the native `accept` attribute, e.g. `"image/*,.pdf"`.
   */
  accept?: string
  /**
   * Maximum size of each file in bytes.
   */
  maxSize?: number
  /**
   * Hide the drop zone when the file limit is reached.
   */
  hideWhenFull?: boolean
  required?: boolean
  disabled?: boolean
  id?: string
  containerClassName?: string
  className?: string
}

export interface SingleFileUploadProps extends FileUploadBaseProps {
  multiple?: false
  maxFiles?: never
}

export interface MultipleFileUploadProps extends FileUploadBaseProps {
  multiple: true
  /**
   * Maximum number of files. Single mode always allows one file.
   */
  maxFiles?: number
}

export type FileUploadProps = SingleFileUploadProps | MultipleFileUploadProps

const FilePreview = ({
  file,
  thumbnailClassName,
  iconClassName,
}: {
  file: File
  thumbnailClassName: string
  iconClassName: string
}) => {
  const [url, setUrl] = useState<string>()

  useEffect(() => {
    if (!file.type.startsWith("image/")) return
    const objectUrl = URL.createObjectURL(file)
    setUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  if (!url) return <DocumentIcon aria-hidden className={iconClassName} />

  // biome-ignore lint/performance/noImgElement: object URLs cannot use next/image
  return <img alt="" className={thumbnailClassName} src={url} />
}

export const FileUpload = ({
  value,
  onChange,
  onReject,
  label,
  hint,
  error,
  accept,
  multiple,
  maxSize,
  maxFiles,
  hideWhenFull,
  required,
  disabled,
  id,
  containerClassName,
  className,
  previewVariant,
}: FileUploadProps) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  const [isDragging, setIsDragging] = useState(false)
  const styles = fileUploadPreviewVariants({ previewVariant })
  const fileLimit = multiple ? (maxFiles ?? Number.POSITIVE_INFINITY) : 1
  const isFull = value.length >= fileLimit

  const addFiles = (files: File[]) => {
    const accepted: File[] = []
    const rejections: FileRejection[] = []

    for (const file of files) {
      if (!matchesAccept(file, accept)) rejections.push({ file, reason: "type" })
      else if (maxSize !== undefined && file.size > maxSize)
        rejections.push({ file, reason: "size" })
      else accepted.push(file)
    }

    if (!multiple) {
      for (const file of accepted.slice(1)) rejections.push({ file, reason: "count" })
      if (rejections.length > 0) onReject?.(rejections)
      if (accepted.length > 0) onChange(accepted.slice(0, 1))
      return
    }

    const existing = new Set(value.map(fileKey))
    const added: File[] = []
    for (const file of accepted) {
      const key = fileKey(file)
      if (existing.has(key)) rejections.push({ file, reason: "duplicate" })
      else {
        existing.add(key)
        added.push(file)
      }
    }
    const space = Math.max(0, fileLimit - value.length)
    for (const file of added.slice(space)) rejections.push({ file, reason: "count" })

    if (rejections.length > 0) onReject?.(rejections)
    if (added.length > 0 && space > 0) onChange([...value, ...added.slice(0, space)])
  }

  const removeFile = (file: File) => {
    onChange(value.filter((f) => f !== file))
  }

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return
    addFiles(Array.from(e.dataTransfer.files))
  }

  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined

  return (
    <div className={cn("flex w-full flex-col justify-start gap-2 font-mono", containerClassName)}>
      {label && (
        <span className="block font-medium text-gray-700 text-sm">
          {label}
          {required && <span className="ml-1 text-brand-pink">*</span>}
        </span>
      )}
      {hint && (
        <p className="paragraph-xs -mt-1 text-gray-400" id={hintId}>
          {hint}
        </p>
      )}
      {!(hideWhenFull && isFull) && (
        <label
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center gap-2 rounded border border-gray-300 border-dashed px-3 py-6 text-center text-gray-500 text-sm focus-within:[outline:-webkit-focus-ring-color_auto_1px]",
            isDragging && "border-brand-pink bg-gray-50",
            error && "border-red-600",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
          htmlFor={inputId}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <ArrowUpTrayIcon aria-hidden className="size-6" />
          <span>
            <span className="font-medium text-gray-700">Click to upload</span> or drag and drop
          </span>
          <input
            accept={accept}
            aria-describedby={describedBy}
            aria-invalid={error ? true : undefined}
            aria-label={label ?? "Upload file"}
            className="sr-only"
            disabled={disabled}
            id={inputId}
            multiple={multiple}
            onChange={(e) => {
              addFiles(Array.from(e.target.files ?? []))
              e.target.value = ""
            }}
            required={required && value.length === 0}
            type="file"
          />
        </label>
      )}
      {value.length > 0 && (
        <ul className={styles.list()}>
          {value.map((file) => (
            <li className={styles.item()} key={fileKey(file)}>
              <FilePreview
                file={file}
                iconClassName={styles.icon()}
                thumbnailClassName={styles.thumbnail()}
              />
              <div className={styles.info()}>
                <span className={styles.name()}>{file.name}</span>
                <span className={styles.size()}>{formatFileSize(file.size)}</span>
              </div>
              <button
                aria-label={`Remove ${file.name}`}
                className={styles.remove()}
                disabled={disabled}
                onClick={() => removeFile(file)}
                type="button"
              >
                <XMarkIcon aria-hidden className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className="mt-1 text-red-600 text-sm" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}
