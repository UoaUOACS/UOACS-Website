import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"

// Only the features RichTextEditor (@uoacs/ui) can edit. It cannot load other nodes.
// Keep in sync with packages/ui/src/components/RichTextEditor/nodes.ts.
export const richTextFeatures = [
  ParagraphFeature(),
  HeadingFeature(),
  BlockquoteFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  BoldFeature(),
  ItalicFeature(),
  UnderlineFeature(),
  AlignFeature(),
  InlineToolbarFeature(),
]

/**
 * Rich text as Payload saves it and RichTextEditor (@uoacs/ui) edits it
 */
export type RichTextValue = SerializedEditorState & { [key: string]: unknown }
