"use client"

import { useEffect, useState } from "react"

const CHARSET = "!@#$%^&*()_+-=[]{}|;:,.<>/?~`\\"

const randomChar = () => CHARSET[Math.floor(Math.random() * CHARSET.length)]

const randomString = (length: number) => Array.from({ length }, randomChar).join("")

/** How often the sweeping strip advances to the next position, in ms */
const SWEEP_INTERVAL_MS = 30

/** Strip width oscillates between these bounds, in characters */
const MIN_STRIP_WIDTH = 5
const MAX_STRIP_WIDTH = 20

/** How many sweep steps make up one full width oscillation */
const WIDTH_CYCLE_STEPS = 40

export interface EncryptedTextSweepOptions {
  /** Where the first strip begins, as a fraction of `length` (0-1) */
  startOffset?: number
  /** How often each strip advances to the next position, in ms */
  intervalMs?: number
  /** Number of independent strips sweeping concurrently, evenly spaced along the text */
  count?: number
}

/**
 * Generates a string of random nonalphanumeric characters. After mount,
 * `count` independent strips sweep across the text from evenly spaced
 * starting points, each shifting and re-randomizing one position at a time
 * before restarting from the beginning. Each strip's width cyclically
 * oscillates between `MIN_STRIP_WIDTH` and `MAX_STRIP_WIDTH` as it sweeps.
 *
 * @param length number of characters to generate
 * @param options.startOffset where the first strip begins, as a fraction of `length` (0-1)
 * @param options.intervalMs how often each strip advances to the next position, in ms
 * @param options.count number of independent strips sweeping concurrently
 * @returns the scrambled string, updated as the strips sweep
 */
export const useEncryptedText = (
  length: number,
  { startOffset = 0, intervalMs = SWEEP_INTERVAL_MS, count = 1 }: EncryptedTextSweepOptions = {},
) => {
  const [text, setText] = useState(() => CHARSET[0].repeat(length)) // static initial value to stop hydration mismatch

  useEffect(() => {
    setText(randomString(length))

    const ids = Array.from({ length: count }, (_, section) => {
      let cursor = Math.floor((startOffset + section / count) * length) % length
      let tick = 0
      const sectionIntervalMs = intervalMs + section * 7

      return setInterval(() => {
        const range = MAX_STRIP_WIDTH - MIN_STRIP_WIDTH
        const phase = (tick / WIDTH_CYCLE_STEPS) * Math.PI * 2
        const width = Math.round(MIN_STRIP_WIDTH + range * (0.5 + 0.5 * Math.sin(phase)))

        setText((current) => {
          const chars = current.split("")
          for (let offset = 0; offset < width; offset++) {
            const index = cursor + offset
            if (index < length) chars[index] = randomChar()
          }
          return chars.join("")
        })

        cursor = (cursor + 1) % length
        tick += 1
      }, sectionIntervalMs)
    })

    return () => {
      for (const id of ids) clearInterval(id)
    }
  }, [length, startOffset, intervalMs, count])

  return text
}
