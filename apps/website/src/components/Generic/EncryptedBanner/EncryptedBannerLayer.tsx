"use client"

import { cn } from "@uoacs/ui/utils"
import { type EncryptedTextSweepOptions, useEncryptedText } from "./useEncryptedText"
import { type EncryptedBannerLayerVariants, encryptedBannerLayerVariants } from "./variants"

export interface WaveConfig {
  /** Vertical swing of the S-curve, in pixels */
  amplitude: number
  /** How sharply the curve transitions through its midpoint (higher = steeper) */
  steepness: number
  /** Per-character rotation at the curve's steepest point, in degrees */
  maxRotate: number
  /** Mirror the curve across the x-axis */
  flip?: boolean
}

const getCharacterStyle = (
  index: number,
  length: number,
  { amplitude, steepness, maxRotate, flip }: WaveConfig,
) => {
  const progress = index / (length - 1)
  const sign = flip ? -1 : 1
  const t = Math.tanh(steepness * (progress - 0.5))
  const y = sign * amplitude * t
  const rotate = sign * maxRotate * (1 - t * t)

  return { transform: `translateY(${y}px) rotate(${rotate}deg)` }
}

export interface EncryptedBannerLayerProps {
  length: number
  colour: EncryptedBannerLayerVariants["colour"]
  wave: WaveConfig
  sweep?: EncryptedTextSweepOptions
  className?: string
}

export const EncryptedBannerLayer = ({
  length,
  colour,
  wave,
  sweep,
  className,
}: EncryptedBannerLayerProps) => {
  const text = useEncryptedText(length, sweep)

  return (
    <span className={cn(encryptedBannerLayerVariants({ colour }), className)}>
      {text.split("").map((char, index) => (
        <span
          className="inline-block"
          // biome-ignore lint/suspicious/noArrayIndexKey: characters are positioned by index along the wave, so index is the stable identity
          key={index}
          style={getCharacterStyle(index, length, wave)}
        >
          {char}
        </span>
      ))}
    </span>
  )
}
