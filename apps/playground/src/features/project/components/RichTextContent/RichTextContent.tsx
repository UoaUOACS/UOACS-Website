import { RichText } from "@payloadcms/richtext-lexical/react"
import { richTextConverters } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import type { ComponentProps } from "react"

/**
 * Renders saved rich text with the same `rich-text` styles as RichTextEditor.
 */
export const RichTextContent = ({
  className,
  data,
}: {
  className?: string
  data: ComponentProps<typeof RichText>["data"] | null
}) =>
  data ? (
    <RichText className={cn("rich-text", className)} converters={richTextConverters} data={data} />
  ) : null
