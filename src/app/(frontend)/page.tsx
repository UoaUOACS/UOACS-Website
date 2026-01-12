import type { Metadata } from "next"
import { SponsorsServerSection } from "./_components/SponsorsServerSection"

export const metadata: Metadata = {
  title: "Home - UOACS",
}

export default async function HomePage() {
  return <SponsorsServerSection />
}
