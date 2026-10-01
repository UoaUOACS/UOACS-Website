"use client"

import { ArrowLeftEndOnRectangleIcon, ArrowUpRightIcon, UserIcon } from "@heroicons/react/24/solid"
import type { DropdownProps } from "@uoacs/ui"
import { Button, Dropdown } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
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
  const title = isHome ? "Presents" : "Project playground"
  const profileOptions: DropdownProps["options"] = [
    {
      href: Routes.PROFILE,
      label: (
        <div className="flex flex-row items-center gap-2">
          <UserIcon className="h-5 w-5" />
          <p>Profile</p>
        </div>
      ),
      theme: "primary",
      className: "w-28",
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
      className: "w-28",
    },
  ]

  return (
    <nav className="flex flex-row items-center justify-between pr-5 pl-5 md:h-20 md:pr-7 md:pl-7">
      <Link className="flex h-15 flex-row items-center" href={logoHref}>
        <Image
          alt="UOACS Logo"
          height={24}
          src={isHome ? "/uoacs-logo-white.svg" : "/uoacs-logo-pink.svg"}
          width={99}
        />
        <span
          className={cn(
            "ml-3 hidden font-bold font-cartograph text-2xl italic leading-7 md:inline",
            isHome ? "text-white" : "text-[#B4B1B1]",
          )}
        >
          {title}
        </span>
      </Link>

      {signedIn ? (
        <Dropdown
          label={<UserIcon className="h-5 w-5" />}
          options={profileOptions}
          theme="dark"
          trigger={{
            triggerClassName:
              "h-9.5 w-9.5 md:h-9.5 md:w-9.5 justify-center rounded-full px-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            triggerIcon: false,
          }}
        />
      ) : (
        <div className="flex flex-row items-center gap-3">
          <Link
            className="inline-flex rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            href={Routes.LOGIN}
          >
            <Button
              className="font-bold font-inter text-white hover:bg-white/50"
              tabIndex={-1}
              theme="ghost"
            >
              Log In
            </Button>
          </Link>
          <Link
            className="hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:inline-flex"
            href={Routes.SIGN_UP}
          >
            <Button
              className="h-8.5 gap-2 bg-white pr-2 pl-3 font-bold font-inter text-primary hover:bg-pink-300"
              right={<ArrowUpRightIcon className="h-5 w-5" />}
              tabIndex={-1}
              theme="primary"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </nav>
  )
}
