import type {
  SerializedHeadingNode,
  SerializedListNode,
  SerializedTextNode,
} from "@payloadcms/richtext-lexical"
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

const HEADING_TAGS: ReadonlySet<string> = new Set(["h1", "h2", "h3", "h4", "h5", "h6"])
const LIST_TAGS: ReadonlySet<string> = new Set(["ol", "ul"])

// Payload's converter renders node.tag as the element with no check. Only allowed tags are kept.
const withTagCheck =
  <T extends SerializedHeadingNode | SerializedListNode>(
    allowedTags: ReadonlySet<string>,
    render: JSXConverter<T> | undefined,
  ): JSXConverter<T> =>
  (args) => {
    if (!allowedTags.has(args.node.tag)) {
      console.error(`richTextConverters: unsupported ${args.node.type} tag`, args.node.tag)
      return null
    }
    return typeof render === "function" ? render(args) : render
  }

/**
 * Payload's default JSX converters for the nodes RichTextEditor supports, with these changes:
 * - Text keeps its font when the font is one the toolbar offers.
 * - Headings and lists with a tag that is not a heading or list tag render nothing.
 * - Other nodes, such as links, uploads and blocks, are logged and render nothing.
 */
export const richTextConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...Object.fromEntries(
    Object.entries(defaultConverters).filter(([type]) => SUPPORTED_NODE_TYPES.has(type)),
  ),
  heading: withTagCheck(HEADING_TAGS, defaultConverters.heading),
  list: withTagCheck(LIST_TAGS, defaultConverters.list),
  text: withFont(defaultConverters.text),
  unknown: ({ node }) => {
    console.error("richTextConverters: unsupported node type", node.type)
    return null
  },
})
