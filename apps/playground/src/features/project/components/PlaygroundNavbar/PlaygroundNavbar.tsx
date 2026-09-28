"use client"

import {
  ArrowLeftEndOnRectangleIcon,
  ArrowUpRightIcon,
  Cog6ToothIcon,
  UserIcon,
} from "@heroicons/react/24/solid"
import type { DropdownProps } from "@uoacs/ui"
import { Button, Dropdown } from "@uoacs/ui"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  DEFAULT_TITLE,
  HOME_HREF,
  HOME_TITLE,
  PROFILE_HREF,
  SETTINGS_HREF,
  SIGN_UP_HREF,
} from "./constants"
import { MobilePlaygroundNavbar } from "./MobilePlaygroundNavbar/MobilePlaygroundNavbar"

/**
 * Props for the {@link PlaygroundNavbar} component.
 */
export interface PlaygroundNavbarProps {
  /**
   * Whether the user is signed in. Rendered as a profile dropdown when true,
   * or a Log In button linking to the sign-up page when false.
   */
  signedIn?: boolean
  /**
   * Route the logo links to.
   */
  logoHref?: string
}

/**

 * @param signedIn Whether the user is signed in.
 * @param logoHref Route the logo links to.
 * @returns A Navbar component with logo, tagline, and auth action.
 */
export function PlaygroundNavbar({
  signedIn = false,
  logoHref = HOME_HREF,
}: PlaygroundNavbarProps) {
  const pathname = usePathname()
  const isHome = pathname === HOME_HREF
  const title = isHome ? HOME_TITLE : DEFAULT_TITLE
  const profileOptions: DropdownProps["options"] = [
    {
      href: PROFILE_HREF,
      label: (
        <div className="flex flex-row items-center gap-2">
          <UserIcon className="h-5 w-5" />
          <p>Profile</p>
        </div>
      ),
      theme: "primary",
      className: "w-[112px]",
    },
    {
      href: SETTINGS_HREF,
      label: (
        <div className="flex flex-row items-center gap-2">
          <Cog6ToothIcon className="h-5 w-5" />
          <p>Settings</p>
        </div>
      ),
      theme: "primary",
      className: "w-[112px]",
    },
    {
      label: (
        <div className="flex flex-row items-center gap-2">
          <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
          <p>Log Out</p>
        </div>
      ),
      onClick: () => {}, // TODO: wire up to auth service signOut
      theme: "primary",
      className: "w-[112px]",
    },
  ]

  const mobileProfileOptions = profileOptions.map((option) => ({
    ...option,
    className: "h-[34px] w-[112px]",
  }))

  return (
    <>
      <MobilePlaygroundNavbar
        logoHref={logoHref}
        profileOptions={mobileProfileOptions}
        signedIn={signedIn}
      />
      <nav className="hidden h-[90px] flex-row items-center justify-between pt-[3px] pr-[27px] pl-[27px] md:flex">
        <Link className="flex h-[60px] flex-row items-center" href={logoHref}>
          <Image alt="UOACS Logo" height={24} src="/uoacs-logo-pink.svg" width={99} />
          <span className="ml-3 font-bold font-cartograph text-[#B4B1B1] text-[22px] italic leading-[27px]">
            {title}
          </span>
        </Link>

        {signedIn ? (
          <Dropdown
            label={<UserIcon className="h-[22px] w-[22px]" />}
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
              className="h-[38px] w-[100px] gap-[9px] rounded-[4px] pr-[5px] pl-[14px] font-inter md:h-[38px]"
              right={<ArrowUpRightIcon className="h-[22px] w-[22px]" />}
              tabIndex={-1}
              theme="dark"
            >
              Log In
            </Button>
          </Link>
        )}
      </nav>
    </>
  )
}
