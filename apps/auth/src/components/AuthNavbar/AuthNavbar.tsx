import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import { Button } from "@uoacs/ui"
import Image from "next/image"

/**
 * A navbar for the auth app, with the UOACS logo and links to the website and the project playground.
 *
 * @returns A Navbar component with logo and external app links.
 */
export function AuthNavbar() {
  return (
    <nav className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
      <a href={process.env.NEXT_PUBLIC_WEBSITE_URL}>
        <Image alt="UOACS Logo" height={40} loading="eager" src="/uoacs-logo.svg" width={167} />
      </a>
      <div className="flex flex-row flex-wrap items-center justify-center gap-3">
        <a className="inline-flex" href={process.env.NEXT_PUBLIC_WEBSITE_URL}>
          <Button
            className="whitespace-nowrap"
            right={<ArrowUpRightIcon className="h-4 w-4 md:h-6 md:w-6" />}
            tabIndex={-1}
            theme="dark"
          >
            Website
          </Button>
        </a>
        <a className="inline-flex" href={process.env.NEXT_PUBLIC_PROJECTS_URL}>
          <Button
            className="whitespace-nowrap"
            right={<ArrowUpRightIcon className="h-4 w-4 md:h-6 md:w-6" />}
            tabIndex={-1}
            theme="primary"
          >
            Project Playground
          </Button>
        </a>
      </div>
    </nav>
  )
}
