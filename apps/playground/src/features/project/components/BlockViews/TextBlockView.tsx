import type { RichTextValue } from "@uoacs/shared/payload"
import type { ReactNode } from "react"
import { RichTextContent } from "@/features/project/components/RichTextContent/RichTextContent"
import { getFirstLineOfText } from "@/features/project/helpers/richText"
import { compactBlockVariants } from "./BlockViews.variants"

export interface TextBlockViewProps {
  content: RichTextValue | null
  /**
   * Show one fixed-height row with the first line of text, for reorder mode
   */
  compact?: boolean
  /**
   * Shown before the content in the compact row, e.g. a drag handle
   */
  leading?: ReactNode
}

export const TextBlockView = ({ content, compact, leading }: TextBlockViewProps) => {
  if (!compact) return <RichTextContent className="w-full" data={content} />

  const { base, content: contentStyles } = compactBlockVariants()
  return (
    <div className={base()}>
      {leading}
      <span className={contentStyles()}>{getFirstLineOfText(content) || "Empty"}</span>
    </div>
  )
}
