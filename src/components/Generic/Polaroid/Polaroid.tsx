import Image from "next/image"

const IMAGE_WIDTH: number = 220
const IMAGE_HEIGHT: number = 250
const POLAROID_HEIGHT: number = 330
const PADDING: number = 12

export interface PolaroidProps {
  /**
   * Text used for describing event name
   */
  text: string
  /**
   * Image location
   */
  url: string
  /**
   * Offset from left edge of parent element
   */
  xOffset: number
  /**
   * Offset from top edge of parent element
   */
  yOffset: number
  /**
   * Rotation in degrees between 0 and 360
   */
  rotation: number
}

export const Polaroid = ({ text, url, xOffset = 0, yOffset = 0, rotation = 0 }: PolaroidProps) => {
  // Math for transforming Image
  const rotationRadians = (rotation / 180) * Math.PI
  const imageWidth: number =
    Math.abs(IMAGE_WIDTH * Math.cos(rotationRadians)) +
    Math.abs(IMAGE_HEIGHT * Math.sin(rotationRadians))
  const scaleFactor = (imageWidth / IMAGE_WIDTH) * 0.91
  const imageCenter = PADDING + IMAGE_HEIGHT / 2
  const rotationOffset = POLAROID_HEIGHT / 2 - imageCenter
  const xTranslate = rotationOffset

  // Styles applied from Math
  const transformStyles = {
    left: `${xOffset}px`,
    top: `${yOffset}px`,
    rotate: `${rotation}deg`,
    height: `${POLAROID_HEIGHT}px`,
    padding: PADDING,
  }
  const reverseRotation = {
    transform: `translate(0,${-xTranslate}px ) rotate(-${rotation}deg) scale(${scaleFactor})`,
  }
  const maskImageStyles = {
    clipPath: `rect(0px ${IMAGE_WIDTH}px ${IMAGE_HEIGHT}px 0px round 1%)`,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  }
  const imageStyles = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    ...reverseRotation,
  }

  return (
    <div
      className="absolute inline-flex flex-col items-center gap-3 rounded-sm bg-white shadow-lg"
      style={transformStyles}
    >
      <div style={maskImageStyles}>
        <Image
          alt="Photo of event"
          className="object-cover"
          height={POLAROID_HEIGHT}
          sizes={`${IMAGE_WIDTH}px`}
          src={url}
          style={imageStyles}
          width={IMAGE_WIDTH + 2 * PADDING}
        />
      </div>
      <p className="paragraph-xs w-full text-left font-mono">{text.toUpperCase()}</p>
    </div>
  )
}
