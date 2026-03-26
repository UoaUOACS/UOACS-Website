import Image from "next/image"
import { Section, ValuesAccordion } from "@/components/Generic"
import { VALUES } from "./ValuesSection.constants"

export const ValuesSection = () => {
  return (
    <Section
      subtitle="These principles guide our behaviors and who we are"
      title="Our Values"
      titleOverlay={
        <Image
          alt="react fragment"
          className="absolute top-0 right-0 h-12 w-12 translate-x-full -translate-y-1/2 md:h-16 md:w-16"
          height={75}
          src="/react-fragment.svg"
          width={75}
        />
      }
    >
      <ValuesAccordion values={VALUES} />
    </Section>
  )
}
