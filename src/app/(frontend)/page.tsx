import type { Metadata } from "next"
import { SponsorsServerSection } from "./_components/SponsorsServerSection"

export const metadata: Metadata = {
  title: "Home - UOACS",
  description: "University of Auckland Computer Society - Join our community of CS students!",
}

export default async function HomePage() {
  return <SponsorsServerSection />
}
