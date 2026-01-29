"use client"

import { AnimatePresence, motion, stagger } from "motion/react"
import { type ReactNode, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../Button/Button"
import type { ButtonVariantProps } from "../Button/variants"
import { DropdownOption, type DropdownOptionProps } from "./DropdownOption"

/**
 * Props for the {@link Dropdown} component.
 */
export interface DropdownProps extends ButtonVariantProps {
  /**
   * A label for the dropdown button.
   */
  label: string
  /**
   * Options for the dropdown menu.
   */
  options: DropdownOptionProps[]
  /**
   * Additional class names for the popover container.
   */
  popoverClassName?: string
  /**
   * Additional class names for the trigger button.
   */
  triggerClassName?: string
  /**
   * Optional icon for the trigger button.
   * If not supplied, falls back to default icon.
   */
  triggerIcon?: ReactNode
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
  popoverClassName,
  triggerClassName,
  triggerIcon,
  ...buttonVariantProps
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-flex">
      <Button
        aria-expanded={isOpen}
        className={triggerClassName}
        onClick={() => setIsOpen(!isOpen)}
        right={
          triggerIcon || (
            <svg
              className={cn("transition-transform duration-200", isOpen && "rotate-180")}
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
          )
        }
        {...buttonVariantProps}
      >
        {label}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate="open"
            className={cn(
              "absolute top-full right-0 z-10 mt-2 flex origin-top flex-col items-end gap-2 rounded-2xl",
              popoverClassName,
            )}
            exit="closed"
            initial="closed"
            role="menu"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.15,
              delayChildren: stagger(0.05),
            }}
            variants={{
              open: { opacity: 1, y: 0 },
              closed: { opacity: 0, y: -5 },
            }}
          >
            {options.map((option) => (
              <motion.div
                key={option.label?.toString()}
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -5 },
                }}
              >
                <DropdownOption {...option} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
