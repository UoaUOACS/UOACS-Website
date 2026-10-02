import { Heading } from "@uoacs/ui"
import { DiscoverProjects } from "@/features/project/components/DiscoverProjects/DiscoverProjects"
import { SearchBar } from "@/features/search/components/SearchBar/SearchBar"

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <Heading h={1} period>
        Project Playground
      </Heading>
      <SearchBar />
      <DiscoverProjects searchParams={searchParams} />
    </>
  )
}
