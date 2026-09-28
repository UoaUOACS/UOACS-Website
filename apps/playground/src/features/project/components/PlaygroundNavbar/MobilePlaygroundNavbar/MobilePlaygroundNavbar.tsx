"use client"

import { ArrowUpRightIcon, UserIcon } from "@heroicons/react/24/solid"
import type { DropdownProps } from "@uoacs/ui"
import { Button, Dropdown } from "@uoacs/ui"
import Image from "next/image"
import Link from "next/link"
import { HOME_HREF, SIGN_UP_HREF } from "../constants"

/**
 * Props for the {@link MobilePlaygroundNavbar} component.
 */
export interface MobilePlaygroundNavbarProps {
  /**
   * Whether the user is signed in. Rendered as a profile dropdown when true,
   * or a square Log In icon linking to the sign-up page when false.
   */
  signedIn?: boolean
  /**
   * Route the logo links to.
   */
  logoHref?: string
  /**
   * Options for the profile dropdown, shared with the desktop navbar.
   */
  profileOptions: DropdownProps["options"]
}

/**
 * @param signedIn Whether the user is signed in.
 * @param logoHref Route the logo links to.
 * @param profileOptions Options for the profile dropdown.
 * @returns A mobile Navbar component.
 */
export const MobilePlaygroundNavbar = ({
  signedIn = false,
  logoHref = HOME_HREF,
  profileOptions,
}: MobilePlaygroundNavbarProps) => {
  return (
    <nav className="flex flex-row items-center justify-between pt-[3px] pr-[21px] pl-[21px] md:hidden">
      <Link href={logoHref}>
        <Image alt="UOACS Logo" height={24} src="/uoacs-logo-pink.svg" width={99} />
      </Link>
      {signedIn ? (
        <Dropdown
          label={<UserIcon className="h-[27px] w-[27px]" />}
          options={profileOptions}
          theme="dark"
          trigger={{
            triggerClassName:
              "h-[38px] w-[38px] md:h-[38px] justify-center rounded-[4px] px-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            triggerIcon: false,
          }}
        />
      ) : (
        <Link
          className="inline-flex rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          href={SIGN_UP_HREF}
        >
          <Button
            aria-label="Log In"
            className="h-[38px] w-[38px] justify-center rounded-[4px] p-0 font-inter md:h-[38px]"
            right={<ArrowUpRightIcon className="h-[22px] w-[22px]" />}
            tabIndex={-1}
            theme="dark"
          />
        </Link>
      )}
    </nav>
  )
}
