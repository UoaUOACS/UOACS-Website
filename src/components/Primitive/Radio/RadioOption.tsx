"use client"

import { cn } from "@/lib/utils"

export interface RadioOptionProps {
  option: string
  checked: boolean
  toggle: (option: string) => void
  name: string
}

export const RadioOption = ({ option, checked, toggle, name }: RadioOptionProps) => {
  return (
    <label className="group flex w-fit cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm">
      <input
        checked={checked}
        className="sr-only"
        name={name}
        onChange={() => toggle(option)}
        type="radio"
        value={option}
      />
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 group-hover:bg-gray-200",
          checked
            ? "border-brand-pink bg-brand-pink group-hover:border-pink-300 group-hover:bg-pink-300"
            : "border-gray-300",
        )}
      />
      {option}
    </label>
  )
}
