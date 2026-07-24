"use client"

import { type KeyboardEvent, type RefObject, useCallback } from "react"

interface UsePopoverKeyboardNavOptions {
  isOpen: boolean
  onClose: () => void
  triggerRef: RefObject<HTMLElement | null>
  itemRefs: RefObject<(HTMLElement | null)[]>
}

export function usePopoverKeyboardNav({
  isOpen,
  onClose,
  triggerRef,
  itemRefs,
}: UsePopoverKeyboardNavOptions) {
  return useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      const items = itemRefs.current.filter((el): el is HTMLElement => el !== null)
      if (items.length === 0) return

      const currentIndex = items.indexOf(document.activeElement as HTMLElement)
      const focus = (index: number) => items[index]?.focus()

      switch (e.key) {
        case "Escape":
          e.preventDefault()
          onClose()
          triggerRef.current?.focus()
          return
        case "ArrowDown":
          e.preventDefault()
          focus(currentIndex === -1 ? 0 : (currentIndex + 1) % items.length)
          return
        case "ArrowUp":
          e.preventDefault()
          focus(
            currentIndex === -1
              ? items.length - 1
              : (currentIndex - 1 + items.length) % items.length,
          )
          return
        case "Home":
          e.preventDefault()
          focus(0)
          return
        case "End":
          e.preventDefault()
          focus(items.length - 1)
          return
        default:
          return
      }
    },
    [isOpen, onClose, triggerRef, itemRefs],
  )
}
