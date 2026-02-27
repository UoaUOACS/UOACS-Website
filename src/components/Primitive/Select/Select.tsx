"use client"

import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "motion/react"
import { forwardRef, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export type SelectOption = string | { label: string; value: string }

export interface SelectProps {
  label: string
  error: string | undefined
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  containerClassName?: string
  required?: boolean
  placeholder?: string
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      value,
      onChange,
      containerClassName,
      required,
      placeholder = "Select an option",
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleMouseDown = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false)
        }
      }
      document.addEventListener("mousedown", handleMouseDown)
      return () => document.removeEventListener("mousedown", handleMouseDown)
    }, [])

    const normalize = (option: SelectOption) =>
      typeof option === "string" ? { label: option, value: option } : option

    const selectedLabel = options.map(normalize).find((o) => o.value === value)?.label

    const select = (val: string) => {
      onChange(val)
      setIsOpen(false)
    }

    return (
      <div
        className={cn("flex w-full flex-col justify-start gap-1 font-mono", containerClassName)}
        ref={containerRef}
      >
        <label className="font-medium text-gray-700 text-sm" htmlFor={label}>
          {label}
          {required && <span className="ml-1 text-brand-pink">*</span>}
        </label>
        <div className="relative">
          <button
            className="flex min-h-11 w-full items-center rounded border border-gray-300 px-3 py-2 text-left text-sm"
            id={label}
            onClick={() => setIsOpen((prev) => !prev)}
            ref={ref}
            type="button"
          >
            <span className={cn("flex-1", !value && "text-gray-400")}>
              {selectedLabel ?? placeholder}
            </span>
            <ChevronDownIcon
              className={cn(
                "ml-auto h-4 w-4 shrink-0 text-gray-700 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full z-10 mt-1 w-full rounded border border-gray-200 bg-white py-2 shadow-md"
                exit={{ opacity: 0, y: -4 }}
                initial={{ opacity: 0, y: -4 }}
                transition={{ damping: 25, stiffness: 400, type: "spring" }}
              >
                {options.map(normalize).map(({ label: optLabel, value: optValue }) => (
                  <li key={optValue}>
                    <button
                      className={cn(
                        "flex w-full items-center px-3 py-2 text-sm transition-colors duration-300 hover:bg-gray-400-opaque",
                        optValue === value &&
                          "pointer-events-none bg-primary font-medium text-white",
                      )}
                      onClick={() => select(optValue)}
                      type="button"
                    >
                      {optLabel}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
      </div>
    )
  },
)
