import { HeroSection } from "@/features/layout/components/HeroSection/HeroSection"
import { DiscoverProjects } from "@/features/project/components/DiscoverProjects/DiscoverProjects"
import { SponsorsSection } from "@/features/sponsor/components/SponsorsSection/SponsorsSection"

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <HeroSection />

      <DiscoverProjects searchParams={searchParams} />

      <SponsorsSection />
    </>
  )
}
