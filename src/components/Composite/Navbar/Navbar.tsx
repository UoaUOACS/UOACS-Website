import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { Button, Dropdown } from "@/components/Primitive"
import type { DropdownOptionProps } from "@/components/Primitive/Dropdown/DropdownOption"

/**
 * Props for the {@link Navbar} component.
 */
export interface NavbarProps {
  /**
   * Links to be displayed in the center of the navbar.
   */
  links: { label: string; href: string }[]
  /**
   * Social links to be displayed in the dropdown on the right of the navbar's middle.
   */
  socialLinks: SocialLink[]
}

/**
 * A single social link: an icon, a label and a destination.
 */
export interface SocialLink {
  label: string
  icon: IconDefinition
  href: string
  onClick?: () => void
}

/**
 * A Navbar component that includes a logo, navigation links, social media dropdown, and a join button.
 *
 * @param links Links to be displayed in the center of the navbar.
 * @param socialLinks Social links to be displayed in the dropdown on the right of the navbar's middle.
 * @returns A Navbar component with logo, navigation links, social dropdown, and join button.
 */
export function Navbar({ links, socialLinks }: NavbarProps) {
  const dropdownOptions = socialLinks.map((s) => ({
    label: (
      <span className="flex items-center gap-2">
        <FontAwesomeIcon className="w-4" icon={s.icon} />
        {s.label}
      </span>
    ),
    href: s.href,
    onClick: s.onClick,
  }))

  return (
    <>
      <div className="-top-40 -z-1 -translate-x-1/2 absolute left-1/2 h-80 w-7/10 rounded-[50%] bg-[linear-gradient(#8A40E7_0%,#C861A7_41%,#F27F76_67%,#FF9961_100%)] opacity-50 blur-3xl" />
      <nav className="flex flex-row items-center justify-between">
        <Link href="/">
          <Image alt="UOACS Logo" height={40} src="/uoacs-logo-bw.svg" width={167} />
        </Link>
        <div className="flex flex-row items-center gap-3">
          <div className="h-fit rounded-2xl bg-white">
            {links.map((link) => (
              <Link className="rounded-2xl" href={link.href} key={link.href}>
                <Button
                  left={<div className="h-2 w-3 rounded-xs bg-primary" />}
                  variant={{ size: "navbar", theme: "ghost", border: "none" }}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
          <Dropdown
            label="SOCIALS"
            options={dropdownOptions}
            optionVariant={{ size: "sm" }}
            triggerVariant={{ size: "navbar", border: "none" }}
            variant={{ size: "md" }}
          />
        </div>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdV530DNIMfGaQJwllWgLq22gsZpIutlHU2NwImHjmJyjWrQQ/viewform"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button
            left={<div className="h-2.5 w-2.5 rounded-[0.92px] bg-white" />}
            variant={{ size: "sm", theme: "dark" }}
          >
            JOIN US
          </Button>
        </a>
      </nav>
    </>
  )
}
