"use client"

import { ArrowLeftEndOnRectangleIcon, ArrowUpRightIcon, UserIcon } from "@heroicons/react/24/solid"
import { AuthPages, authPageUrl } from "@uoacs/shared"
import type { DropdownProps } from "@uoacs/ui"
import { Button, Dropdown } from "@uoacs/ui"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "@/features/user/context/SessionContext"
import { Routes } from "@/lib/routes"

/**
 * Props for the {@link PlaygroundNavbar} component.
 */
export interface PlaygroundNavbarProps {
  /**
   * Route the logo links to.
   */
  logoHref?: string
}

/**
 * A responsive navbar for the playground, with logo, page title, and auth action.
 *
 * @param logoHref Route the logo links to.
 * @returns A Navbar component with logo, tagline, and auth action.
 */
export function PlaygroundNavbar({ logoHref = Routes.HOME }: PlaygroundNavbarProps) {
  const pathname = usePathname()
  const session = useSession()
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
    <nav className="flex w-full flex-row items-center justify-between">
      <Link className="flex flex-row items-center gap-3" href={logoHref}>
        <Image alt="UOACS Logo" height={40} src="/uoacs-logo-pink.svg" width={167} />
        <span className="hidden font-bold font-cartograph text-2xl text-gray-400 italic leading-7 md:inline">
          {title}
        </span>
      </Link>

      {session ? (
        <Dropdown
          label={<UserIcon className="h-4 w-4" />}
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
          <a
            className="inline-flex"
            href={authPageUrl(
              AuthPages.LOGIN,
              `${process.env.NEXT_PUBLIC_PROJECTS_URL}${pathname}`,
            )}
          >
            <Button tabIndex={-1} theme="ghost">
              Log In
            </Button>
          </a>
          <a
            className="hidden md:inline-flex"
            href={authPageUrl(
              AuthPages.SIGN_UP,
              `${process.env.NEXT_PUBLIC_PROJECTS_URL}${pathname}`,
            )}
          >
            <Button
              right={<ArrowUpRightIcon className="h-4 w-4 md:h-6 md:w-6" />}
              tabIndex={-1}
              theme="primary"
            >
              Sign Up
            </Button>
          </a>
        </div>
      )}
    </nav>
  )
}
