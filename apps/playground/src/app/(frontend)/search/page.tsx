import { SearchResults } from "@/features/search/components/SearchResults/SearchResults"

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return <SearchResults searchParams={searchParams} />
}
