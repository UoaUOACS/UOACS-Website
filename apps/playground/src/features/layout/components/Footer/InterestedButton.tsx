"use client"

import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import { AuthPages, authPageUrl } from "@uoacs/shared"
import { Button } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import { usePathname } from "next/navigation"

export const InterestedButton = ({ className }: { className?: string }) => {
  const pathname = usePathname()
  return (
    <a href={authPageUrl(AuthPages.SIGN_UP, `${process.env.NEXT_PUBLIC_PROJECTS_URL}${pathname}`)}>
      <Button
        className={cn("whitespace-nowrap", className)}
        right={<ArrowUpRightIcon className="h-4 w-4 text-white" />}
        theme="primary"
      >
        Interested? Join UOACS
      </Button>
    </a>
  )
}
