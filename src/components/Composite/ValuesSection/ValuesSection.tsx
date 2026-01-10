import Image from "next/image"
import { ValuesCarousel } from "@/components/Composite"
import { Heading } from "@/components/Primitive"

export const ValuesSection = () => {
  return (
    <div className="flex flex-col items-center justify-center pb-28">
      <div className="flex flex-col items-center justify-center gap-4 pb-22">
        <div className="relative flex justify-center">
          <Heading h={2}>Our Values</Heading>
          <Image
            alt="react fragment"
            className="-right-20 -top-4 absolute"
            height={75}
            src="/react-fragment.svg"
            width={75}
          />
        </div>
        <p className="font-light text-md md:text-lg">
          These principles guide our behaviors and who we are
        </p>
      </div>
      <ValuesCarousel />
    </div>
  )
}
