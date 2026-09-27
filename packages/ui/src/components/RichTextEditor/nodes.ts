import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"

// Keep in sync with the Lexical features in packages/shared/src/payload/richText.ts.
export const RICH_TEXT_NODES = [HeadingNode, QuoteNode, ListNode, ListItemNode]

/** Every node type RichTextEditor can load. It refuses content with any other type. */
export const SUPPORTED_NODE_TYPES: ReadonlySet<string> = new Set([
  "root",
  "paragraph",
  "text",
  "linebreak",
  "tab",
  ...RICH_TEXT_NODES.map((node) => node.getType()),
])
