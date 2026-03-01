import type { Metadata } from "next"
import { getPayload } from "payload"
import { Heading } from "@/components/Primitive"
import config from "@/payload.config"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the University of Auckland Computer Society collects and uses your data.",
}

type PrivacySection = {
  heading: string
  content: string
}

type PrivacyPolicyGlobal = {
  sections?: PrivacySection[] | null
  updatedAt?: string | null
}

export default async function PrivacyPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const policy = (await payload.findGlobal({ slug: "privacy-policy" })) as PrivacyPolicyGlobal

  const sections = policy.sections ?? []
  const updatedAt = policy.updatedAt ? new Date(policy.updatedAt) : null

  return (
    <div className="flex w-full flex-col items-center gap-8 px-4">
      <div className="flex w-full flex-col gap-2">
        <Heading className="justify-start" h={2} period>
          Privacy Policy
        </Heading>
        {updatedAt && (
          <p className="paragraph-xs text-gray-500">
            Last updated:{" "}
            {updatedAt.toLocaleDateString("en-NZ", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>

      <div className="flex w-full flex-col gap-8">
        {sections.length === 0 ? (
          <p className="paragraph text-gray-500">Privacy policy coming soon.</p>
        ) : (
          sections.map((section, i) => (
            <div className="flex flex-col gap-2" key={`${section.heading}-${i}`}>
              <h3 className="paragraph font-semibold">{section.heading}</h3>
              <p className="paragraph whitespace-pre-line text-gray-700">{section.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
