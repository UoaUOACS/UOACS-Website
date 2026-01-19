"use client"

import { useState } from "react"
import { ValueCard, type ValueCardProps, ValuesFingerprint } from "@/components/Generic"

interface Value {
  title: string
  colour: ValueCardProps["colour"]
  content: React.ReactNode
}

export const ValuesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const values: Value[] = [
    {
      title: "Collaborate",
      colour: "purple",
      content: (
        <>
          <p>
            Most people in the industry would agree that the phrase,
            <span className="bg-accent-highlight"> "Your network is your net worth"</span>, rings
            true.
          </p>
          <p>
            We also align ourselves with this phrase and we hope to cultivate an environment where
            people can expand their network and create opportunities for their futures.
          </p>
          <p>Whether this is with the faculty, industry or even just with one another.</p>
        </>
      ),
    },
    {
      title: "Network",
      colour: "red",
      content: (
        <>
          <p>
            Most people in the industry would agree that the phrase,
            <span className="bg-accent-highlight"> "Your network is your net worth"</span>, rings
            true.
          </p>
          <p>
            We also align ourselves with this phrase and we hope to cultivate an environment where
            people can expand their network and create opportunities for their futures.
          </p>
          <p>Whether this is with the faculty, industry or even just with one another.</p>
        </>
      ),
    },
    {
      title: "Connect",
      colour: "yellow",
      content: (
        <>
          <p>
            Most people in the industry would agree that the phrase,
            <span className="bg-accent-highlight"> "Your network is your net worth"</span>, rings
            true.
          </p>
          <p>
            We also align ourselves with this phrase and we hope to cultivate an environment where
            people can expand their network and create opportunities for their futures.
          </p>
          <p>Whether this is with the faculty, industry or even just with one another.</p>
        </>
      ),
    },
    {
      title: "Develop",
      colour: "blue",
      content: (
        <>
          <p>
            Most people in the industry would agree that the phrase,
            <span className="bg-accent-highlight"> "Your network is your net worth"</span>, rings
            true.
          </p>
          <p>
            We also align ourselves with this phrase and we hope to cultivate an environment where
            people can expand their network and create opportunities for their futures.
          </p>
          <p>Whether this is with the faculty, industry or even just with one another.</p>
        </>
      ),
    },
  ]

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? values.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === values.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex flex-col gap-12 px-4 [@media(min-width:1410px)]:flex-row [@media(min-width:1410px)]:items-center [@media(min-width:1410px)]:justify-center [@media(min-width:1410px)]:gap-38 [@media(min-width:1410px)]:px-40">
      <div className="flex flex-col items-center gap-4 pr-8 [@media(min-width:1410px)]:gap-8 [@media(min-width:1410px)]:pr-0">
        <div className="flex scale-60 gap-36 md:scale-100">
          <button
            aria-label="Select Collaborate value"
            className="cursor-pointer"
            onClick={() => setActiveIndex(0)}
            type="button"
          >
            <ValuesFingerprint label="Collaborate" variant={{ colour: "purple", size: "md" }} />
          </button>
          <button
            aria-label="Select Network value"
            className="cursor-pointer"
            onClick={() => setActiveIndex(1)}
            type="button"
          >
            <ValuesFingerprint label="Network" variant={{ colour: "red", size: "md" }} />
          </button>
        </div>
        <div className="flex scale-60 gap-36 md:scale-100">
          <button
            aria-label="Select Connect value"
            className="cursor-pointer"
            onClick={() => setActiveIndex(2)}
            type="button"
          >
            <ValuesFingerprint label="Connect" variant={{ colour: "yellow", size: "md" }} />
          </button>
          <button
            aria-label="Select Develop value"
            className="cursor-pointer"
            onClick={() => setActiveIndex(3)}
            type="button"
          >
            <ValuesFingerprint label="Develop" variant={{ colour: "blue", size: "md" }} />
          </button>
        </div>
      </div>
      <div className="relative flex w-full justify-center [@media(min-width:1410px)]:w-auto [@media(min-width:1410px)]:justify-start">
        <div className="relative inline-block">
          <ValueCard colour={values[activeIndex].colour} title={values[activeIndex].title}>
            <div className="flex flex-col gap-8">{values[activeIndex].content}</div>
          </ValueCard>

          {/* Navigation buttons */}
          <div className="-bottom-3 -right-3 absolute z-10 flex gap-0 rounded border border-gray-400 bg-white">
            <button
              aria-label="Previous value"
              className="flex h-8 w-8 cursor-pointer items-center justify-center border-gray-400 border-r"
              onClick={handlePrevious}
              type="button"
            >
              <div className="h-0 w-0 border-t-[6px] border-t-transparent border-r-8 border-r-black border-b-[6px] border-b-transparent" />
            </button>
            <button
              aria-label="Next value"
              className="flex h-8 w-8 cursor-pointer items-center justify-center"
              onClick={handleNext}
              type="button"
            >
              <div className="h-0 w-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-8 border-l-black" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
