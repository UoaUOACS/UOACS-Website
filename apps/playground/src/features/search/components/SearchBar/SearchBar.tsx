"use client"

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Input } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import { useImperativeHandle, useRef } from "react"

/**
 * Props for the {@link SearchBar} component.
 *
 * Extends the native `<input>` props, so anything an input accepts (`name`,
 * `value`, `defaultValue`, `onKeyDown`, ...) is passed straight through.
 */
export interface SearchBarProps extends Omit<React.ComponentPropsWithRef<"input">, "type"> {
  /**
   * Additional class names for the wrapping element.
   */
  containerClassName?: string
  /**
   * Called with the current text whenever the user types or clears the field.
   * Runs after `onChange`.
   */
  onValueChange?: (value: string) => void
}

/**
 * The Project Playground search control: a white pill-shaped text field with a
 * leading magnifying glass and a trailing button that clears the field.
 *
 * Works controlled (`value` + `onChange`/`onValueChange`) or uncontrolled
 * (`defaultValue`). Actually querying projects is out of scope.
 *
 * @param containerClassName Additional class names for the wrapping element.
 * @param onValueChange Called with the current text whenever it changes.
 * @returns The search control.
 * @example
 * <SearchBar onValueChange={setQuery} />
 */
export const SearchBar = ({
  containerClassName,
  className,
  onChange,
  onValueChange,
  placeholder = "Search",
  disabled,
  readOnly,
  "aria-label": ariaLabel = "Search",
  ref,
  ...props
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  // Callers still get the real <input> through `ref`; we keep our own handle
  // so the clear button can reach it.
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)
    onValueChange?.(event.target.value)
  }

  const handleClear = () => {
    const input = inputRef.current
    if (!input) return

    // Writing through the native setter and firing a real "input" event makes
    // React run onChange exactly as if the user had deleted the text, so
    // clearing works the same for controlled and uncontrolled usage (and for
    // form libraries that listen to onChange).
    const setNativeValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
    setNativeValue?.call(input, "")
    input.dispatchEvent(new Event("input", { bubbles: true }))
    input.focus()
  }

  return (
    <search className={cn("relative w-full", containerClassName)}>
      <MagnifyingGlassIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-6 size-6 -translate-y-1/2 text-black"
      />
      <Input
        {...props}
        aria-label={ariaLabel}
        className={cn(
          // Per the Figma, focus shows no ring: the shadow deepens and the
          // placeholder fades so the caret stands out.
          "h-16 rounded-full border-0 bg-white px-16 font-switzer text-black text-lg shadow-[0_4px_16px_rgb(0_0_0/0.12)] outline-none transition-shadow placeholder:text-gray-800 focus:shadow-[0_6px_24px_rgb(0_0_0/0.2)] focus:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-search-cancel-button]:appearance-none",
          className,
        )}
        disabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        ref={inputRef}
        type="search"
      />
      <button
        aria-label="Clear search"
        className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-black transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
        disabled={disabled || readOnly}
        onClick={handleClear}
        type="button"
      >
        <XMarkIcon aria-hidden="true" className="size-5" />
      </button>
    </search>
  )
}
