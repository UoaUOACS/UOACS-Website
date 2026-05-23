"use client"

import { AnimatePresence, motion } from "motion/react"
import { type Ref, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../Button/Button"
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
  toggleable?: boolean
  onSave?: () => void
  defaultToggleState?: boolean
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
  toggleable = false,
  onSave,
  defaultToggleState = false,
  ref,
}: RadioProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(defaultToggleState)

  const toggle = (option: string) => {
    if (value === option) return
    onChange?.(option)
  }

  return (
    <div
      className={cn(
        "group flex w-full flex-col justify-start gap-1 font-mono",
        toggleable && !isEditable && "border-gray-300 border-b-2",
        containerClassName,
      )}
    >
      <div className="flex flex-row justify-between">
        <span className="block font-medium text-gray-700 text-sm" id={`${label}-label`}>
          {label}
          {required && <span className="ml-1 text-brand-pink">*</span>}
        </span>
        {toggleable && (
          <div className="relative">
            <div
              className={cn(
                "transition-opacity duration-150",
                isEditable
                  ? "invisible"
                  : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
              )}
            >
              <Button
                className="h-auto px-2 py-1 text-xs leading-none md:h-auto"
                onClick={() => setIsEditable(true)}
              >
                Edit
              </Button>
            </div>
            <AnimatePresence>
              {isEditable && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute top-0 right-0"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex flex-row gap-2">
                    <Button
                      className="h-auto px-2 py-1 text-xs leading-none md:h-auto"
                      onClick={() => setIsEditable(false)}
                      theme="ghost"
                    >
                      Close
                    </Button>
                    <Button
                      className="h-auto px-2 py-1 text-xs leading-none md:h-auto"
                      onClick={() => {
                        onSave?.()
                        setIsEditable(false)
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
      {!toggleable || isEditable ? (
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
      ) : (
        <p className="py-2 text-left text-gray-600 text-paragraph">{value}</p>
      )}
      {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
    </div>
  )
}
