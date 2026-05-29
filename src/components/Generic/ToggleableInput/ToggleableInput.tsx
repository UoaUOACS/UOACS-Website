"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../../Primitive/Button/Button"

export interface ToggleableProps {
  label: string
  required?: boolean
  error?: string
  containerClassName?: string
  displayNode: React.ReactNode
  onSave?: () => void
  defaultToggleState?: boolean
  children: React.ReactNode
}

export const ToggleableInput = ({
  label,
  required,
  error,
  containerClassName,
  displayNode,
  onSave,
  defaultToggleState = false,
  children,
}: ToggleableProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(defaultToggleState)

  return (
    <div
      className={cn(
        "group flex w-full flex-col justify-start gap-2 font-mono",
        !isEditable && "border-gray-300 border-b-2",
        containerClassName,
      )}
    >
      <div className="flex flex-row justify-between">
        <span className="block font-medium text-gray-700 text-sm">
          {label}
          {required && <span className="ml-1 text-brand-pink">*</span>}
        </span>
        <div className="relative">
          {!isEditable && (
            <div className="opacity-0 transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100">
              <Button
                aria-label={`Edit ${label}`}
                className="h-auto px-2 py-1 text-xs leading-none md:h-auto"
                onClick={() => setIsEditable(true)}
              >
                Edit
              </Button>
            </div>
          )}
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
      </div>
      {isEditable ? (
        children
      ) : typeof displayNode === "string" ? (
        <p className="py-2 text-left text-gray-600 text-paragraph">{displayNode}</p>
      ) : (
        displayNode
      )}
      {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
    </div>
  )
}
