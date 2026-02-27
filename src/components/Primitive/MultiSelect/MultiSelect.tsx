"use client"

import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "motion/react"
import { forwardRef, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../Button/Button"

interface MultiSelectProps {
  label: string
  error: string | undefined
  options: string[]
  value: string[]
  onChange: (values: string[]) => void
  customTextInput?: boolean
  containerClassName?: string
  required?: boolean
  placeholder?: string
}

export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      label,
      error,
      options,
      value,
      onChange,
      containerClassName,
      required,
      customTextInput = false,
      placeholder = "Select options",
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [customValue, setCustomValue] = useState("")
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

    const toggle = (option: string) => {
      if (value.includes(option)) {
        onChange(value.filter((v) => v !== option))
      } else {
        onChange([...value, option])
      }
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
            className="flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded border border-gray-300 px-3 py-2 text-left"
            id={label}
            onClick={() => setIsOpen((prev) => !prev)}
            ref={ref}
            type="button"
          >
            {value.length === 0 ? (
              <span className="text-gray-400 text-sm">{placeholder}</span>
            ) : (
              value.map((v) => (
                <span
                  className="flex items-center gap-1 rounded bg-primary px-2 py-0.5 text-sm text-white"
                  key={v}
                >
                  {v}
                  <XMarkIcon
                    className="h-4 w-4"
                    onClick={() => {
                      toggle(v)
                    }}
                  />
                </span>
              ))
            )}
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
                {options.map((option) => {
                  const checked = value.includes(option)
                  return (
                    <li key={option}>
                      <button
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors duration-300 hover:bg-gray-400-opaque"
                        onClick={() => toggle(option)}
                        type="button"
                      >
                        <span
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                            checked ? "border-brand-pink bg-brand-pink" : "border-gray-300",
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
                              <path
                                d="M1.5 6l3 3 6-6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        {option}
                      </button>
                    </li>
                  )
                })}
                {customTextInput && (
                  <li className="flex flex-row items-center gap-2 border-gray-200 border-t py-2 pr-2">
                    <input
                      className="w-full border-0 px-3 py-2 text-sm focus:ring-0"
                      onChange={(e) => setCustomValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && customValue.trim() !== "") {
                          e.preventDefault()
                          if (!value.includes(customValue.trim())) {
                            onChange([...value, customValue.trim()])
                          }
                          setCustomValue("")
                        }
                      }}
                      placeholder="Other option..."
                      type="text"
                      value={customValue}
                    />
                    <Button
                      onClick={() => {
                        if (customValue.trim() !== "" && !value.includes(customValue.trim())) {
                          onChange([...value, customValue.trim()])
                        }
                        setCustomValue("")
                      }}
                      theme="ghost"
                    >
                      Add
                    </Button>
                  </li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
      </div>
    )
  },
)
