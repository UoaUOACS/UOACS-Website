import type { ValueColour } from "./enums"

/**
 *
 */
export interface Value {
  title: string
  colour: ValueColour
  content: React.ReactNode
}
