"use client"

import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion, stagger } from "motion/react"
import { type ReactNode, useEffect, useRef, useState } from "react"
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
  label: string | ReactNode
  /**
   * Options for the dropdown menu.
   */
  options: DropdownOptionProps[]
  /**
   * Additional class names for the popover container.
   */
  popoverClassName?: string
  /**
   * Trigger button configuration, or `false` to hide the trigger icon entirely.
   * Omit for default triangle icon.
   */
  trigger?: false | { triggerClassName?: string; triggerIcon?: ReactNode }
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
  trigger,
  ...buttonVariantProps
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      setIsOpen(false)
    }
    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)
    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [])

  const triggerClassName = trigger !== false ? trigger?.triggerClassName : undefined
  const triggerRight =
    trigger === false
      ? undefined
      : (trigger?.triggerIcon ?? (
          <ChevronDownIcon className={cn("h-4 w-4", isOpen && "rotate-180")} />
        ))

  return (
    <div className="relative inline-flex" ref={ref}>
      <Button
        aria-expanded={isOpen}
        className={cn("z-20", triggerClassName)}
        onClick={() => setIsOpen(!isOpen)}
        right={triggerRight}
        {...buttonVariantProps}
      >
        {label}
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate="open"
            className={cn(
              "absolute top-full right-0 z-5 mt-2 flex origin-top flex-col items-end gap-2 rounded-2xl",
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
                key={option.href ?? option.label?.toString()}
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
