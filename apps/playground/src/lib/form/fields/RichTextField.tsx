"use client"

import { useDebouncer } from "@tanstack/react-pacer"
import type { RichTextValue } from "@uoacs/shared/payload"
import type { RichTextEditorProps } from "@uoacs/ui/rich-text-editor"
import dynamic from "next/dynamic"
import { useId } from "react"
import { useFlushOnSubmit } from "../flush"
import { getFieldError, useFieldContext } from "../formContext"

// Lexical loads only when a rich text field first renders
const RichTextEditor = dynamic(
  () => import("@uoacs/ui/rich-text-editor").then((mod) => mod.RichTextEditor),
  { ssr: false },
)

/**
 * Starts loading the editor early, e.g. on hover or focus of a block that will show it
 */
export const preloadRichTextEditor = () => void import("@uoacs/ui/rich-text-editor")

export interface RichTextFieldProps
  extends Pick<RichTextEditorProps, "className" | "disabled" | "placeholder"> {
  label: string
  /**
   * How long to wait after a keystroke before writing the value to the form
   */
  wait?: number
}

/**
 * The editor is uncontrolled and reads the field value once. Remount it with a new `key` to load
 * other content.
 */
export const RichTextField = ({ label, wait = 300, ...props }: RichTextFieldProps) => {
  const field = useFieldContext<RichTextValue | null>()
  const id = useId()
  const error = getFieldError(field.state.meta.errors)

  // Serialising the Lexical state on every keystroke is slow on long pages
  const debouncer = useDebouncer(field.handleChange, {
    wait,
    onUnmount: (d) => d.flush(),
  })
  const flush = () => debouncer.flush()
  useFlushOnSubmit(field.form, flush)

  return (
    <div className="flex w-full flex-col gap-2 font-mono">
      <span className="block font-medium text-gray-700 text-sm" id={`${id}-label`}>
        {label}
      </span>
      <RichTextEditor
        {...props}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        aria-labelledby={`${id}-label`}
        defaultValue={field.state.value}
        onBlur={() => {
          flush()
          field.handleBlur()
        }}
        onChange={(value) => debouncer.maybeExecute(value)}
      />
      {error && (
        <p className="text-red-600 text-sm" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  )
}
