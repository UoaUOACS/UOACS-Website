import { PlusIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import type { Value } from "@/types/common"

/**
 * Props for the ValuesAccordionItem component
 */
export interface ValuesAccordionItemProps {
  value: Value
  isOpen?: boolean
  onClick?: () => void
}

/**
 * ValuesAccordionItem component represents a single item in the ValuesAccordion.
 *
 * @param value The value to display in the accordion item.
 */
export const ValuesAccordionItem = ({
  value,
  isOpen = false,
  onClick,
}: ValuesAccordionItemProps) => {
  return (
    <div className="flex flex-col gap-3 border-gray-300 border-b px-1 py-4">
      <button
        className="flex cursor-pointer flex-row items-center justify-between bg-white"
        onClick={onClick}
        type="button"
      >
        <h3
          className={cn(
            "font-medium font-mono text-xl",
            {
              pink: "text-brand-pink",
              orange: "text-brand-orange",
              purple: "text-brand-purple",
              blue: "text-brand-blue",
            }[value.colour],
          )}
        >
          {value.title.toUpperCase()}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          initial={false}
          transition={{ type: "spring", visualDuration: 0.3, stiffness: 500, damping: 20 }}
        >
          <PlusIcon className="h-4 w-4 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence initial={false} mode="wait">
        {isOpen && (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            className="overflow-hidden px-2"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
            transition={{ ease: "easeInOut" }}
          >
            {value.content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
