"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Button } from "@/components/Primitive"
import { cn } from "@/lib/utils"
import type { ButtonVariantProps } from "../Button/variants"
import { DropdownOption, type DropdownOptionProps } from "./DropdownOption"
import { type DropdownVariantProps, dropdownVariants } from "./variants"

/**
 * Props for the {@link Dropdown} component.
 */
export interface DropdownProps {
  /**
   * A label for the dropdown button.
   */
  label: string
  /**
   * Options for the dropdown menu.
   */
  options: DropdownOptionProps[]
  /**
   * Variant configuration for the dropdown.
   */
  variant?: DropdownVariantProps
  /**
   * Variant configuration for the dropdown options.
   */
  optionVariant?: ButtonVariantProps
  /**
   * Additional class names for the popover container.
   */
  popoverClassName?: string
  /**
   * Additional class names for the trigger button.
   */
  triggerClassname?: string
}

/**
 * A primitive Dropdown component that provides a button to toggle a list of options.
 *
 * @param props {@link DropdownProps} for the Dropdown component.
 * @returns A styled dropdown element.
 */
export const Dropdown = ({
  label,
  options,
  variant,
  optionVariant,
  popoverClassName,
  triggerClassname,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { popover, icon } = dropdownVariants({
    ...variant,
    theme: (optionVariant?.theme as DropdownVariantProps["theme"]) || variant?.theme,
    isOpen,
  })

  return (
    <div className="relative inline-flex">
      <Button
        aria-expanded={isOpen}
        className={triggerClassname}
        onClick={() => setIsOpen(!isOpen)}
        right={
          <svg
            className={icon()}
            fill="none"
            height="9"
            viewBox="0 0 11 9"
            width="11"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Toggle dropdown</title>
            <path
              d="M5.91805 8.775C5.73225 9.075 5.26775 9.075 5.08195 8.775L0.0653922 0.675C-0.120406 0.375 0.111842 -3.02841e-08 0.483439 0L10.5166 8.17672e-07C10.8882 8.47956e-07 11.1204 0.375001 10.9346 0.675001L5.91805 8.775Z"
              fill="currentColor"
            />
          </svg>
        }
        variant={variant}
      >
        {label}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(popover(), popoverClassName)}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            role="menu"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              visualDuration: 0.15,
            }}
          >
            {options.map((option) => (
              <DropdownOption
                key={option.label?.toString()}
                {...option}
                variant={{ theme: variant?.theme, ...optionVariant, ...option.variant }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
