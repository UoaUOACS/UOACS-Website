import Link from "next/link"
import { cn } from "@/lib/utils"
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
   * An optional click handler for the dropdown option.
   */
  onClick?: () => void
}

/**
 * A dropdown option component used within the {@link Dropdown} component.
 *
 * @param props {@link DropdownOptionProps} for the DropdownOption component.
 * @returns A styled dropdown option element.
 */
export const DropdownOption = ({ label, href, onClick, ...variant }: DropdownOptionProps) => {
  if (href) {
    const variantClasses = buttonVariants(variant)
    return (
      <Link href={href} rel="noopener noreferrer" role="menuitem" target="_blank">
        <div className={cn(variantClasses, "whitespace-nowrap")}>{label || "Option"}</div>
      </Link>
    )
  }

  return (
    <Button className="z-5 whitespace-nowrap" onClick={onClick} role="menuitem" {...variant}>
      {label || "Option"}
    </Button>
  )
}
