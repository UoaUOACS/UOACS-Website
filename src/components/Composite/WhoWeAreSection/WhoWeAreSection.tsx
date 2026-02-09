"use client"

import { useEffect, useRef, useState } from "react"
import { Polaroid } from "@/components/Generic"
import { Heading } from "@/components/Primitive"
import type { Polaroid as PolaroidType } from "@/payload/payload-types"

/**
 * Props for the {@link WhoWeAreSection} component
 */
export interface WhoWeAreSectionProps {
  /**
   *
   */
  polaroids: PolaroidType[]
}

const POLAROID_PRESETS = [
  { x: 0, y: 0, rotation: 0 },
  { x: 180, y: 40, rotation: 15 },
  { x: 320, y: 80, rotation: 45 },
]

// Base dimensions for the polaroid layout (at scale 1)
const BASE_WIDTH = 564 // 320 + 244 (max x_offset + polaroid width)
const BASE_HEIGHT = 410 // 80 + 330 (max y_offset + polaroid height)

/**
 * A section component that introduces who we are with text and polaroid images
 *
 * @param polaroids An array of polaroid objects to display in the section
 */
export const WhoWeAreSection = ({ polaroids }: WhoWeAreSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        setScale(Math.min(1, containerWidth / BASE_WIDTH))
      }
    }
    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [])

  return (
    <div className="flex w-full flex-col items-center gap-10 px-6 py-12">
      <div className="flex max-w-lg flex-col items-center gap-4 text-center">
        <Heading h={2}>Who We Are</Heading>
        <p className="paragraph">
          As well as being a social club, we also help out newer students through workshops and run
          industry related events to connect you with real companies.
        </p>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-12">
        <div className="flex w-full max-w-md flex-col gap-4 md:w-auto">
          <div className="flex min-h-36 flex-col gap-2 bg-accent-purple-light p-4">
            <Heading className="justify-start text-left" h={3}>
              Social Gatherings
            </Heading>
            <p>
              We host regular social events to help you meet new people, make friends and have fun
              within the CS community.
            </p>
          </div>
          <div className="flex min-h-36 flex-col gap-2 bg-accent-red-light p-4">
            <Heading className="justify-start text-left" h={3}>
              Workshops
            </Heading>
            <p>
              Practical, hands-on workshops that are led by students and industry speakers to help
              you build real skills.
            </p>
          </div>
          <div className="flex min-h-36 flex-col gap-2 bg-accent-yellow-light p-4">
            <Heading className="justify-start text-left" h={3}>
              Collaborations
            </Heading>
            <p>
              We partner with companies, societies and other student groups to run events that
              connect you with real-world experience and opportunities.
            </p>
          </div>
        </div>

        <div
          className="w-full max-w-xl flex-1"
          ref={containerRef}
          style={{ height: BASE_HEIGHT * scale }}
        >
          <div
            className="relative -left-5 origin-top-left"
            style={{
              width: BASE_WIDTH,
              height: BASE_HEIGHT,
              transform: `scale(${scale})`,
            }}
          >
            {polaroids.map((polaroid, index) => {
              const photo = polaroid.image
              let src: string | undefined

              if (!photo) {
                src = undefined
              } else if (typeof photo === "string") {
                src = photo
              } else if (typeof photo === "object" && photo !== null) {
                src = photo.url ?? photo.thumbnailURL ?? undefined
              }

              if (!src) return null

              const preset = POLAROID_PRESETS[index % POLAROID_PRESETS.length]

              return (
                <Polaroid
                  key={polaroid.id}
                  rotation={preset.rotation}
                  text={polaroid.caption}
                  url={src}
                  x_offset={preset.x}
                  y_offset={preset.y}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
