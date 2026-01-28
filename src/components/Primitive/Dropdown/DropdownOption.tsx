import Link from "next/link"
import { cn } from "@/lib/utils"
import { BorderButton } from "../BorderButton/BorderButton"
import { type BorderButtonVariantProps, borderButtonVariants } from "../BorderButton/variants"

/**
 * Props for the {@link DropdownOption} component.
 */
export interface DropdownOptionProps {
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
  /**
   * Variant configuration for the button within the dropdown option.
   */
  variant?: BorderButtonVariantProps
}

/**
 * A dropdown option component used within the {@link Dropdown} component.
 *
 * @param props {@link DropdownOptionProps} for the DropdownOption component.
 * @returns A styled dropdown option element.
 */
export const DropdownOption = ({ label, href, onClick, variant }: DropdownOptionProps) => {
  const mergedVariant = { border: false, size: "lg", ...variant } as BorderButtonVariantProps

  if (href) {
    const { inner, border } = borderButtonVariants(mergedVariant)
    return (
      <Link
        className={cn(border(), "block w-full")}
        href={href}
        rel="noopener noreferrer"
        role="menuitem"
        target="_blank"
      >
        <div className={cn(inner(), "w-full justify-start whitespace-nowrap p-3")}>
          {label || "Option"}
        </div>
      </Link>
    )
  }

  return (
    <BorderButton
      borderClassName="w-full"
      className="w-full justify-start whitespace-nowrap p-3"
      onClick={onClick}
      role="menuitem"
      variant={mergedVariant}
    >
      {label || "Option"}
    </BorderButton>
  )
}
