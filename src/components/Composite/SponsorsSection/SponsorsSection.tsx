import Link from "next/link"
import { getPayload } from "payload"
import { SponsorTicker } from "@/components/Generic"
import { Button, Heading } from "@/components/Primitive"
import type { Sponsor } from "@/payload/payload-types"
import config from "@/payload.config"

/**
 * A section component that displays sponsors with a heading, description, ticker, and link to all sponsors
 */
export const SponsorsSection = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: sponsors }: { docs: Sponsor[] } = await payload.find({
    collection: "sponsor",
  })

  return (
    <div className="flex flex-col items-center justify-center gap-6 md:gap-12">
      <div className="flex flex-col items-center gap-6 px-4 text-center">
        <Heading h={2}>Sponsored By</Heading>
        <p className="text-md md:text-lg">
          These are the people that support us and make this club possible.
        </p>
      </div>
      <SponsorTicker items={sponsors} />
      <Link href="/sponsors">
        <Button borderClassName="md:hidden" variant={{ theme: "dark", size: "sm", border: true }}>
          SEE ALL SPONSORS
        </Button>
        <Button
          borderClassName="hidden md:inline-flex"
          variant={{ theme: "dark", size: "md", border: true }}
        >
          SEE ALL SPONSORS
        </Button>
      </Link>
    </div>
  )
}
