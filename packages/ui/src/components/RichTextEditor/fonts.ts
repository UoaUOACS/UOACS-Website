import { getStyleObjectFromCSS } from "@lexical/selection"

/** Fonts the toolbar offers. "Normal" removes the font, so the text uses the app font. */
export const FONTS = [
  { label: "Normal", value: "" },
  { label: "Mono", value: "var(--font-mono)" },
  { label: "Fancy", value: "var(--font-neulis)" },
] as const

const FONT_VALUES: ReadonlySet<string> = new Set(FONTS.map((font) => font.value).filter(Boolean))

/** The `font-family` in a text node's style, or `undefined` if it is not one of {@link FONTS}. */
export const fontFamilyFromStyle = (style: string) => {
  const fontFamily = getStyleObjectFromCSS(style)["font-family"]
  return fontFamily && FONT_VALUES.has(fontFamily) ? fontFamily : undefined
}
