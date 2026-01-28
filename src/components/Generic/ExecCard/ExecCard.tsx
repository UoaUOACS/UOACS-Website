import Image from "next/image"
import type { Executive } from "@/payload/payload-types"

export interface ExecCardProps {
  exec: Executive
}

export const ExecCard = ({ exec }: ExecCardProps) => {
  const photo = exec.photo
  let src: string | undefined

  if (!photo) {
    src = undefined
  } else if (typeof photo === "string") {
    src = photo
  } else if (typeof photo === "object" && photo !== null) {
    const maybeMedia = photo as { url?: string | null; thumbnailURL?: string | null }
    src = maybeMedia.url ?? maybeMedia.thumbnailURL ?? undefined
  }

  return (
    <div className="flex flex-col items-start gap-3">
      {src ? (
        <Image
          alt={`${exec.name} photo`}
          className="size-full max-h-32 max-w-32 rounded-sm object-cover md:max-h-50 md:max-w-50"
          height={200}
          priority
          src={src}
          width={200}
        />
      ) : (
        <p className="flex aspect-square size-full max-h-32 max-w-32 items-center justify-center rounded-sm bg-gray-200 font-md text-gray-700 text-xl md:max-h-50 md:max-w-50">
          {exec.name
            ? exec.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
            : ""}
        </p>
      )}
      <div className="flex flex-col items-start gap-1">
        <p className="paragraph">{exec.name}</p>
        {exec.role.title && (
          <p className="paragraph-xs font-medium text-gray-500">{exec.role.title}</p>
        )}
      </div>
    </div>
  )
}
