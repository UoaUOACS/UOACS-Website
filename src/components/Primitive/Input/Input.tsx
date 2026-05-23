"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../Button/Button"

export interface InputProps extends React.ComponentPropsWithRef<"input"> {
  label: string
  error: string | undefined
  toggleable: boolean
  onSave: () => void
  defaultToggleState?: boolean
  containerClassName?: string
}

export const Input = ({
  label,
  error,
  containerClassName,
  className,
  required,
  ref,
  onSave,
  toggleable = false,
  defaultToggleState = false,
  ...props
}: InputProps) => {
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
        <label className="block font-medium text-gray-700 text-sm" htmlFor={label}>
          {label}
          {required && <span className="ml-1 text-brand-pink">*</span>}
        </label>
        {toggleable && (
          <div className="relative">
            <div
              className={cn(
                "transition-opacity duration-150",
                isEditable ? "invisible" : "opacity-0 group-hover:opacity-100",
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
                      onClick={onSave}
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
      {isEditable ? (
        <input
          className={cn("w-full rounded border border-gray-300 px-3 py-2", className)}
          id={label}
          ref={ref}
          {...props}
        />
      ) : (
        <p className={cn("py-2 text-left text-gray-600 text-paragraph", className)}>
          {props.value}
        </p>
      )}
      {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
    </div>
  )
}
