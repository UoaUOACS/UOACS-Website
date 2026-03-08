"use client"

import type { Ref } from "react"
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
  ref?: Ref<HTMLDivElement>
}

export const Radio = ({
  options,
  label,
  error,
  containerClassName,
  optionsClassName,
  required,
  onChange,
  value,
  ref,
}: RadioProps) => {
  const toggle = (option: string) => {
    if (value === option) return
    onChange?.(option)
  }

  return (
    <div className={cn("flex w-full flex-col justify-start gap-1 font-mono", containerClassName)}>
      <span className="block font-medium text-gray-700 text-sm" id={`${label}-label`}>
        {label}
        {required && <span className="ml-1 text-brand-pink">*</span>}
      </span>
      <div
        aria-labelledby={`${label}-label`}
        className={cn("flex flex-col items-start gap-2", optionsClassName)}
        ref={ref}
        role="radiogroup"
      >
        {options.map((option) => (
          <RadioOption
            checked={value === option}
            key={option}
            name={label}
            option={option}
            toggle={toggle}
          />
        ))}
      </div>
      {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
    </div>
  )
}
