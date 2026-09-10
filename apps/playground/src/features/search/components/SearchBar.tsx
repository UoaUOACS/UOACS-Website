"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { Input } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import { useState } from "react"

/**
 * Props for the {@link SearchBar} component.
 */
export interface SearchBarProps {
  /**
   * Accessible name for the search field, which has no visible label.
   */
  label?: string
  /**
   * Placeholder text shown while the field is empty.
   */
  placeholder?: string
  /**
   * Initial value of the search field.
   */
  defaultValue?: string
  /**
   * Called with the current text whenever the user types.
   */
  onValueChange?: (value: string) => void
  /**
   * Additional class names for the wrapping element.
   */
  className?: string
}

/**
 * The Project Playground search control: a pill-shaped text field with a
 * trailing magnifying glass.
 *
 * Owns its own input state and reports every change through `onValueChange`.
 * Actually querying projects is out of scope.
 *
 * @param label Accessible name for the search field.
 * @param placeholder Placeholder text shown while the field is empty.
 * @param defaultValue Initial value of the search field.
 * @param onValueChange Called with the current text whenever the user types.
 * @param className Additional class names for the wrapping element.
 * @returns The search control.
 * @example
 * <SearchBar onValueChange={setQuery} />
 */
export const SearchBar = ({
  label = "Search projects",
  placeholder = "Search projects, tags, creators...",
  defaultValue = "",
  onValueChange,
  className,
}: SearchBarProps) => {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onValueChange?.(event.target.value)
  }

  return (
    <search className={cn("relative w-full", className)}>
      <Input
        aria-label={label}
        className="rounded-full border-primary bg-white py-2 pr-11 pl-5 font-mono text-black text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-search-cancel-button]:appearance-none"
        onChange={handleChange}
        placeholder={placeholder}
        type="search"
        value={value}
      />
      <MagnifyingGlassIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-primary"
      />
    </search>
  )
}
