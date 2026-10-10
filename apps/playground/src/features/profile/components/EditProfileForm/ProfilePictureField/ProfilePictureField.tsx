"use client"

import { UserIcon } from "@heroicons/react/24/outline"
import { Button, Dialog, FILE_REJECTION_MESSAGES, FileUpload, LazyImage } from "@uoacs/ui"
import { toast } from "@uoacs/ui/toast"
import { useEffect, useState } from "react"

export interface ProfilePictureFieldProps {
  /**
   * The URL of the member's current profile picture, if they have one.
   */
  currentURL?: string | null
}

/**
 * The profile picture with "Upload new photo" and "Remove" buttons.
 *
 * Preview only: `editMember` cannot save a picture yet, so nothing picked here is uploaded.
 */
export const ProfilePictureField = ({ currentURL }: ProfilePictureFieldProps) => {
  const [src, setSrc] = useState(currentURL ?? undefined)
  const [isUploading, setIsUploading] = useState(false)

  // Frees a picked file's preview once it is replaced or the field unmounts
  useEffect(
    () => () => {
      if (src?.startsWith("blob:")) URL.revokeObjectURL(src)
    },
    [src],
  )

  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-sm bg-gray-200">
        {src ? (
          <LazyImage
            alt="Your profile picture"
            className="object-cover!"
            containerClassName="h-full w-full"
            fill
            sizes="80px"
            src={src}
          />
        ) : (
          <UserIcon aria-hidden="true" className="size-full p-[20%] text-gray-400" />
        )}
      </div>
      <div className="flex gap-3">
        <Button
          className="border border-gray-300 bg-white text-base"
          onClick={() => setIsUploading(true)}
          shape="pill"
          size="md"
          theme="ghost"
        >
          Upload new photo
        </Button>
        <Button
          className="text-base"
          disabled={!src}
          onClick={() => setSrc(undefined)}
          shape="pill"
          size="md"
        >
          Remove
        </Button>
      </div>

      <Dialog onClose={() => setIsUploading(false)} open={isUploading} title="Upload new photo">
        <FileUpload
          accept="image/png,image/jpeg,image/webp"
          hint="PNG, JPEG or WebP, up to 4 MB"
          maxSize={4 * 1024 * 1024}
          onChange={([file]) => {
            if (!file) return
            setSrc(URL.createObjectURL(file))
            setIsUploading(false)
          }}
          onReject={([rejection]) =>
            toast.error({ description: FILE_REJECTION_MESSAGES[rejection.reason] })
          }
          value={[]}
        />
      </Dialog>
    </div>
  )
}
