import { Button, Heading } from "@uoacs/ui"
import Image from "next/image"
import Link from "next/link"
import { Routes } from "@/lib/routes"

export function NotFoundContent() {
  return (
    <div className="flex grow flex-col items-center justify-center gap-8 px-4 py-16 md:flex-row md:gap-16">
      <div className="flex items-start gap-3">
        <span aria-hidden className="heading-1 text-5xl text-primary italic md:text-7xl">
          &#47;&#47;
        </span>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col gap-2">
            <Heading className="justify-start font-medium text-5xl md:text-7xl" h={1}>
              404 Error
            </Heading>
            <p className="paragraph max-w-100 font-light">
              Sorry we couldn&apos;t find the page you were looking for
            </p>
          </div>
          <Link href={Routes.HOME}>
            <Button shape="pill" size="lg" theme="dark">
              Go Home
            </Button>
          </Link>
        </div>
      </div>
      <Image
        alt=""
        className="size-48 md:size-64"
        height={256}
        priority
        src="/sad-mascot.png"
        width={256}
      />
    </div>
  )
}
