import type { SerializedTextNode } from "@payloadcms/richtext-lexical"
import type {
  JSXConverter,
  JSXConverters,
  JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react"
import { fontFamilyFromStyle } from "./fonts"
import { SUPPORTED_NODE_TYPES } from "./nodes"

// Payload's converter ignores the text style. Only fonts from FONTS are kept, not any CSS.
const withFont =
  (render: JSXConverters<SerializedTextNode>["text"]): JSXConverter<SerializedTextNode> =>
  (args) => {
    const fontFamily = fontFamilyFromStyle(args.node.style)
    const text = typeof render === "function" ? render(args) : render
    return fontFamily ? <span style={{ fontFamily }}>{text}</span> : text
  }

/**
 * Payload's default JSX converters for the nodes RichTextEditor supports, with these changes:
 * - Text keeps its font when the font is one the toolbar offers.
 * - Other nodes, such as links, uploads and blocks, are logged and render nothing.
 */
export const richTextConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...Object.fromEntries(
    Object.entries(defaultConverters).filter(([type]) => SUPPORTED_NODE_TYPES.has(type)),
  ),
  text: withFont(defaultConverters.text),
  unknown: ({ node }) => {
    console.error("richTextConverters: unsupported node type", node.type)
    return null
  },
})
