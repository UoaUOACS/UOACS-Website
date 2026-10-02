import { Heading } from "@uoacs/ui"
import { DiscoverProjects } from "@/features/project/components/DiscoverProjects/DiscoverProjects"

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <Heading h={1} period>
        Project Playground
      </Heading>
      <DiscoverProjects searchParams={searchParams} />
    </>
  )
}
