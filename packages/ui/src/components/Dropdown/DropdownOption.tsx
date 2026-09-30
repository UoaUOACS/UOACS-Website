import Link from "next/link"
import type { Ref } from "react"
import { cn } from "../../utils"
import { Button } from "../Button/Button"
import { type ButtonVariantProps, buttonVariants } from "../Button/variants"

/**
 * Props for the {@link DropdownOption} component.
 */
export interface DropdownOptionProps extends ButtonVariantProps {
  /**
   * A label for the dropdown option.
   */
  label: string | React.ReactNode
  /**
   * An optional link for the dropdown option.
   */
  href?: string
  /**
   * An optional click handler for the dropdown option. Called for link options too, before navigating.
   */
  onClick?: () => void
  /**
   * Additional class names for the option, e.g. `w-full` to fill the menu width. Full-width
   * options also need `items-stretch` in the dropdown's `popoverClassName`.
   */
  className?: string
  /**
   * A ref to the underlying link/button element, used for keyboard roving focus.
   */
  ref?: Ref<HTMLElement>
}

/**
 * A dropdown option component used within the {@link Dropdown} component.
 *
 * @param props {@link DropdownOptionProps} for the DropdownOption component.
 * @returns A styled dropdown option element.
 */
export const DropdownOption = ({
  label,
  href,
  onClick,
  ref,
  className,
  ...variant
}: DropdownOptionProps) => {
  const setRef = (el: HTMLElement | null) => {
    if (typeof ref === "function") ref(el)
    else if (ref) ref.current = el
  }

  if (href) {
    const variantClasses = buttonVariants(variant)
    const isExternal = href.startsWith("http")
    return (
      <Link
        className={cn(variantClasses, "whitespace-nowrap", className)}
        href={href}
        onClick={onClick}
        ref={setRef}
        rel={isExternal ? "noopener noreferrer" : undefined}
        role="menuitem"
        target={isExternal ? "_blank" : "_self"}
      >
        {label || "Option"}
      </Link>
    )
  }

  return (
    <Button
      className={cn("z-5 whitespace-nowrap", className)}
      onClick={onClick}
      ref={setRef}
      role="menuitem"
      {...variant}
    >
      {label || "Option"}
    </Button>
  )
}
