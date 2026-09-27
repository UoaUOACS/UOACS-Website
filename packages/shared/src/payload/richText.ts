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

// Only the features RichTextEditor (@uoacs/ui) can edit. It cannot load other nodes.
// AlignFeature adds no nodes: it sets the `format` of existing blocks.
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
