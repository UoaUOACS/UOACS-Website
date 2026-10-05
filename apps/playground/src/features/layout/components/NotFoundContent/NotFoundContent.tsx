import { Button } from "@uoacs/ui"
import Image from "next/image"
import Link from "next/link"

export function NotFoundContent() {
  return (
    <main className="flex grow items-center justify-center px-4 py-16">
      <div className="flex w-full max-w-243.75 flex-col items-center justify-center gap-10 px-8 py-16 md:h-126.25 md:flex-row md:gap-16">
        <div className="flex flex-col gap-6 md:pl-10">
          <h1 className="relative font-semibold text-[50px]">
            <span className="-translate-x-full absolute font-extrabold text-primary italic">
              &#47;&#47;&nbsp;
            </span>
            404 Error
          </h1>
          <p className="-mt-6 max-w-140.5 font-light text-[22px]">
            Sorry we couldn&apos;t find the page you were
            <br />
            looking for
          </p>
          <Link className="w-fit" href="/">
            <Button
              className="h-16.75 w-37 justify-center rounded-full text-xl md:h-16.75"
              theme="dark"
            >
              Return
            </Button>
          </Link>
        </div>
        <Image
          alt=""
          className="-scale-x-100 rotate-[3.98deg]"
          height={264}
          priority
          src="/sad-mascot.png"
          width={264}
        />
      </div>
    </main>
  )
}
