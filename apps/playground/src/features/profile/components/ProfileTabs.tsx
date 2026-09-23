"use client"

import { cn } from "@uoacs/ui/utils"
import { useRef, useState } from "react"

/**
 * A single entry in the {@link ProfileTabs} switcher.
 */
export interface ProfileTab {
  /**
   * Stable identifier reported through `onValueChange`.
   */
  id: string
  /**
   * Visible label, e.g. "Projects".
   */
  label: string
  /**
   * Number shown in the badge beside the label.
   */
  count: number
}

/**
 * Props for the {@link ProfileTabs} component.
 */
export interface ProfileTabsProps {
  /**
   * Tabs to render, in display order.
   */
  tabs: ProfileTab[]
  /**
   * Selected tab id when the parent owns the selection.
   */
  value?: string
  /**
   * Initially selected tab id when this component owns the selection.
   * Defaults to the first tab.
   */
  defaultValue?: string
  /**
   * Called with the tab id whenever the selection changes.
   */
  onValueChange?: (id: string) => void
  /**
   * Id of the element these tabs control, wired up as `aria-controls`.
   */
  panelId?: string
  /**
   * Accessible name for the tab list.
   */
  label?: string
  /**
   * Additional class names for the wrapping element.
   */
  className?: string
}

/**
 * The pill-shaped switcher between a profile's collections, each with a count
 * badge.
 *
 * Works controlled (`value` + `onValueChange`) or uncontrolled (`defaultValue`).
 * Follows the ARIA tabs pattern: arrow keys, Home, and End move the selection,
 * and only the selected tab is in the tab order.
 *
 * @param tabs Tabs to render, in display order.
 * @param value Selected tab id when the parent owns the selection.
 * @param defaultValue Initially selected tab id when this component owns the selection.
 * @param onValueChange Called with the tab id whenever the selection changes.
 * @param panelId Id of the element these tabs control.
 * @param label Accessible name for the tab list.
 * @param className Additional class names for the wrapping element.
 * @returns The tab switcher.
 * @example
 * <ProfileTabs
 *   onValueChange={setTab}
 *   tabs={[{ id: "projects", label: "Projects", count: 8 }]}
 * />
 */
export const ProfileTabs = ({
  tabs,
  value,
  defaultValue,
  onValueChange,
  panelId,
  label = "Profile collections",
  className,
}: ProfileTabsProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? tabs[0]?.id)
  const selectedId = value ?? uncontrolledValue
  const tabRefs = useRef(new Map<string, HTMLButtonElement | null>())

  const select = (id: string) => {
    setUncontrolledValue(id)
    onValueChange?.(id)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const current = tabs.findIndex((tab) => tab.id === selectedId)
    if (current === -1) {
      return
    }

    let nextIndex: number
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (current + 1) % tabs.length
        break
      case "ArrowLeft":
        nextIndex = (current - 1 + tabs.length) % tabs.length
        break
      case "Home":
        nextIndex = 0
        break
      case "End":
        nextIndex = tabs.length - 1
        break
      default:
        return
    }

    const nextTab = tabs[nextIndex]
    if (!nextTab) {
      return
    }

    event.preventDefault()
    select(nextTab.id)
    tabRefs.current.get(nextTab.id)?.focus()
  }

  return (
    <div
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-pink-300 p-1 md:p-1.5",
        className,
      )}
      onKeyDown={handleKeyDown}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isSelected = tab.id === selectedId

        return (
          <button
            aria-controls={panelId}
            aria-selected={isSelected}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-full px-4 py-1.5 font-cartograph text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:px-5 md:py-2 md:text-base",
              isSelected ? "bg-primary text-white" : "text-pink-800 hover:bg-pink-200",
            )}
            key={tab.id}
            onClick={() => {
              select(tab.id)
            }}
            ref={(node) => {
              tabRefs.current.set(tab.id, node)
            }}
            role="tab"
            tabIndex={isSelected ? 0 : -1}
            type="button"
          >
            {tab.label}
            <span
              className={cn(
                "min-w-6 rounded-full px-2 py-0.5 text-xs md:min-w-7 md:text-sm",
                isSelected ? "bg-pink-700 text-white" : "bg-white text-pink-800",
              )}
            >
              {tab.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
