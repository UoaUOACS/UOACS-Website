"use client"

import { cn } from "@/lib/utils"

export interface RadioOptionProps {
  option: string
  checked: boolean
  toggle: (option: string) => void
}

export const RadioOption = ({ option, checked, toggle }: RadioOptionProps) => {
  return (
    <button
      className="group flex w-fit items-center gap-2 px-3 py-2 text-left text-sm"
      onClick={() => {
        toggle(option)
      }}
      type="button"
    >
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors duration-300 group-hover:bg-gray-200",
          checked
            ? "border-brand-pink bg-brand-pink group-hover:border-pink-300 group-hover:bg-pink-300"
            : "border-gray-300",
        )}
      >
        {checked && (
          <svg
            aria-hidden="true"
            className="h-2.5 w-2.5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 12 12"
          >
            <path d="M1.5 6l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {option}
    </button>
  )
}
