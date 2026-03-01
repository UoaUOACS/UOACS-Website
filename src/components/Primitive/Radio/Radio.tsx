"use client"

import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"
import { RadioOption } from "./RadioOption"

export interface RadioProps {
  options: string[]
  label: string
  error: string | undefined
  containerClassName?: string
  optionsClassName?: string
  required?: boolean
  onChange?: (option: string) => void
  value?: string
}

export const Radio = forwardRef<HTMLDivElement, RadioProps>(
  (
    { options, label, error, containerClassName, optionsClassName, required, onChange, value },
    ref,
  ) => {
    const [selected, setSelected] = useState<string | null>(value || null)

    const toggle = (option: string) => {
      if (selected === option) return
      setSelected(option)
      onChange?.(option)
    }

    return (
      <div className={cn("flex w-full flex-col justify-start gap-1 font-mono", containerClassName)}>
        <label className="block font-medium text-gray-700 text-sm" htmlFor={label}>
          {label}
          {required && <span className="ml-1 text-brand-pink">*</span>}
        </label>
        <div className={cn("flex flex-col items-start gap-2", optionsClassName)} ref={ref}>
          {options.map((option) => (
            <RadioOption
              checked={selected === option}
              key={option}
              option={option}
              toggle={toggle}
            />
          ))}
        </div>
        {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
      </div>
    )
  },
)
