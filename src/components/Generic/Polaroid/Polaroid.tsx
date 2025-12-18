import Image from "next/image"

const IMAGE_WIDTH: number = 390
const IMAGE_HEIGHT: number = 445
const POLAROID_HEIGHT: number = 580
const PADDING: number = 25

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
  x_offset: number
  /**
   * Offset from top edge of parent element
   */
  y_offset: number
  /**
   * Rotation in degrees between 0 and 360
   */
  rotation: number
}

export const Polaroid = ({
  text,
  url,
  x_offset = 0,
  y_offset = 0,
  rotation = 0,
}: PolaroidProps) => {
  // Math for transforming Image
  const rotrad = (rotation / 180) * Math.PI
  const image_width: number =
    Math.abs(IMAGE_WIDTH * Math.cos(rotrad)) + Math.abs(IMAGE_HEIGHT * Math.sin(rotrad))
  const scale_factor = (image_width / IMAGE_WIDTH) * 0.91
  const image_center = PADDING + IMAGE_HEIGHT / 2
  const rotation_offset = POLAROID_HEIGHT / 2 - image_center
  const x_translate = rotation_offset

  // Styles applied from Math
  const transform_styles = {
    left: `${x_offset}px`,
    top: `${y_offset}px`,
    rotate: `${rotation}deg`,
    height: `${POLAROID_HEIGHT}px`,
    padding: PADDING,
  }
  const reverse_rot = {
    transform: `translate(0,${-x_translate}px ) rotate(-${rotation}deg) scale(${scale_factor})`,
  }
  const mask_image_styles = {
    clipPath: `rect(0px ${IMAGE_WIDTH}px ${IMAGE_HEIGHT}px 0px round 1%)`,
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  }

  return (
    <div
      className="center justify-top fixed inline-flex flex-col items-center gap-7 rounded-sm bg-white shadow-lg"
      style={transform_styles}
    >
      <div style={mask_image_styles}>
        <Image alt="Photo of event" layout="fill" objectFit="cover" src={url} style={reverse_rot} />
      </div>
      <p className="w-full font-mono">{text.toUpperCase()}</p>
    </div>
  )
}
