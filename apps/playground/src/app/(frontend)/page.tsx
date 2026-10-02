import { Button, Heading } from "@uoacs/ui"
import Link from "next/link"
import { DiscoverProjects } from "@/features/project/components/DiscoverProjects/DiscoverProjects"
import { SearchBar } from "@/features/search/components/SearchBar/SearchBar"
import { Routes } from "@/lib/routes"

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <div className="flex w-full max-w-full flex-col items-center justify-center gap-10 px-2 pt-[8vh] text-center md:w-fit md:gap-20 md:px-0 md:pt-[16vh]">
        <div className="flex w-fit max-w-full flex-col items-center gap-3 text-[clamp(1.5rem,6.5vw,4rem)] md:gap-4">
          <div className="flex w-max max-w-full flex-row items-center justify-center gap-[0.25em] whitespace-nowrap font-black font-neulis">
            <Heading className="font-neulis text-[1em]!" h={1}>
              Project
            </Heading>
            <Heading className="font-neulis text-[1em]! text-primary" h={1}>
              Playground
            </Heading>
          </div>

          <div className="relative w-0 min-w-full">
            <span
              aria-hidden="true"
              className="absolute top-0 right-full pr-[0.4em] font-semibold text-primary text-sm md:text-[0.3em]"
            >
              /&#47;
            </span>
            <p className="text-center text-secondary text-sm md:text-[0.3em]">
              A space to showcase student projects, creativity, and innovation. Explore what our
              students have created and get inspired!
            </p>
          </div>
        </div>

        <Link href={Routes.PROJECTS.CREATE}>
          <Button
            className="h-auto rounded-xl px-3.5 py-2 font-medium text-sm md:rounded-2xl md:px-5 md:py-3 md:text-xl"
            font="cartograph"
            shape="rounded"
            size="md"
            theme="primary-dark"
          >
            Start Creating Now!
          </Button>
        </Link>

        <div className="flex flex-col items-center justify-center gap-4 md:w-full">
          <Link
            className="group text-base text-black underline decoration-1 decoration-transparent underline-offset-4 transition-colors duration-300 hover:text-secondary hover:decoration-current md:text-xl"
            href="https://uoacs.co.nz/"
          >
            Return to{" "}
            <span className="font-bold text-primary transition-colors duration-300 group-hover:text-primary/50">
              UOACS
            </span>{" "}
            website
          </Link>

          <SearchBar />
        </div>
      </div>

      <DiscoverProjects searchParams={searchParams} />
    </>
  )
}
