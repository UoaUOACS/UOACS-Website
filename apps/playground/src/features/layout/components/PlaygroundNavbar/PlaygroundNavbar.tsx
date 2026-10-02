"use client"

import { ArrowLeftEndOnRectangleIcon, ArrowUpRightIcon, UserIcon } from "@heroicons/react/24/solid"
import type { DropdownProps } from "@uoacs/ui"
import { Button, Dropdown } from "@uoacs/ui"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Routes } from "@/lib/routes"

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
 * A responsive navbar for the playground, with logo, page title, and auth action.
 *
 * @param signedIn Whether the user is signed in.
 * @param logoHref Route the logo links to.
 * @returns A Navbar component with logo, tagline, and auth action.
 */
export function PlaygroundNavbar({
  signedIn = false,
  logoHref = Routes.HOME,
}: PlaygroundNavbarProps) {
  const pathname = usePathname()
  const isHome = pathname === Routes.HOME
  const title = isHome ? "Presents" : "Project Playground"
  const profileOptions: DropdownProps["options"] = [
    {
      href: Routes.PROFILE,
      label: (
        <div className="flex flex-row items-center gap-2">
          <UserIcon className="h-4 w-4" />
          <p>Profile</p>
        </div>
      ),
      theme: "primary",
    },
    {
      label: (
        <div className="flex flex-row items-center gap-2">
          <ArrowLeftEndOnRectangleIcon className="h-4 w-4" />
          <p>Log Out</p>
        </div>
      ),
      onClick: () => {}, // TODO: wire up to auth service signOut
      theme: "primary",
    },
  ]

  return (
    <nav className="flex w-full flex-row items-center justify-between px-5 md:h-20 md:px-7">
      <Link className="flex h-15 flex-row items-center gap-3" href={logoHref}>
        <Image alt="UOACS Logo" height={24} src="/uoacs-logo-pink.svg" width={99} />
        <span className="hidden font-bold font-cartograph text-2xl text-gray-400 italic leading-7 md:inline">
          {title}
        </span>
      </Link>

      {signedIn ? (
        <Dropdown
          label={<UserIcon className=“h-4 w-4" />}
          options={profileOptions}
          shape="pill"
          size="icon"
          theme="dark"
          trigger={{
            triggerClassName:
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            triggerIcon: false,
          }}
        />
      ) : (
        <div className="flex flex-row items-center gap-3">
          <Link className="inline-flex" href={Routes.LOGIN}>
            <Button tabIndex={-1} theme="ghost">
              Log In
            </Button>
          </Link>
          <Link className="hidden md:inline-flex" href={Routes.SIGN_UP}>
            <Button right={<ArrowUpRightIcon className="h-4 w-4" />} tabIndex={-1} theme="primary">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
