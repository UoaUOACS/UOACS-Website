import type { SerializedAutoLinkNode, SerializedLinkNode } from "@payloadcms/richtext-lexical"
import type { JSXConverter, JSXConvertersFunction } from "@payloadcms/richtext-lexical/react"

const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:"])

const safeHref = (url: unknown) => {
  if (typeof url !== "string") return null
  try {
    return SAFE_PROTOCOLS.has(new URL(url).protocol) ? url : null
  } catch {
    return null
  }
}

// Payload's converter renders any URL, so only safe ones stay links. The rest render as plain text.
const link: JSXConverter<SerializedAutoLinkNode | SerializedLinkNode> = ({ node, nodesToJSX }) => {
  const children = nodesToJSX({ nodes: node.children ?? [] })
  const href = node.fields?.linkType === "internal" ? null : safeHref(node.fields?.url)
  if (!href) return <>{children}</>
  return node.fields.newTab ? (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  ) : (
    <a href={href}>{children}</a>
  )
}

/**
 * Payload's default JSX converters, with these changes:
 * - Links are kept only for http, https and mailto URLs.
 * - Uploads render nothing. Payload's converter uses the upload URL with no check, and the editor
 *   cannot make upload nodes.
 * - Nodes with no converter render nothing, not the text "unknown node".
 */
export const richTextConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  autolink: link,
  link,
  upload: () => null,
  unknown: ({ node }) => {
    console.error("RichTextContent: no converter for node type", node.type)
    return null
  },
})
