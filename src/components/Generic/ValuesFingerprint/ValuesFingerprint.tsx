import { cn } from "@/lib/utils"
import { type ValuesFingerprintVariants, valuesFingerprintVariants } from "./variants"

/**
 * Props for the ValuesFingerprint component
 */
export interface ValuesFingerprintProps {
  /**
   * Label to display over the fingerprint SVG
   */
  label: string
  /**
   * Tailwind variants to apply to the component
   */
  variant: ValuesFingerprintVariants
  /**
   * Further class names to apply to the surrounding div
   */
  className?: string
}

/**
 * ValuesFingerprint component displays a fingerprint SVG with a label overlay.
 * For use in the Values section of the homepage.
 *
 * @param label The label to display over the fingerprint SVG.
 * @param variant The variant styles to apply to the component.
 * @param className Additional class names to apply to the container.
 * @returns An element displaying a fingerprint SVG with an overlaid label.
 */
export const ValuesFingerprint = ({ label, variant, className }: ValuesFingerprintProps) => {
  const { svg: svgClass, label: labelClass, container } = valuesFingerprintVariants(variant)
  return (
    <div className={cn(container(), className)}>
      <svg
        aria-label="fingerprint"
        className={svgClass()}
        height={128}
        role="img"
        viewBox="0 0 150 128"
        width={150}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M75 115.5C75 113.843 76.3431 112.5 78 112.5H87C88.6569 112.5 90 111.157 90 109.5V108C90 106.343 91.3431 105 93 105H94.5C96.1569 105 97.5 103.657 97.5 102V100.5C97.5 98.8431 98.8431 97.5 100.5 97.5H105H109.5C111.157 97.5 112.5 96.1569 112.5 94.5V93C112.5 91.3431 113.843 90 115.5 90H117C118.657 90 120 88.6569 120 87V85.5C120 83.8431 121.343 82.5 123 82.5H124.5C126.157 82.5 127.5 81.1569 127.5 79.5V78C127.5 76.3431 128.843 75 130.5 75H132C133.657 75 135 73.6569 135 72V67.5V63C135 61.3431 136.343 60 138 60H139.5C141.157 60 142.5 58.6569 142.5 57V48C142.5 46.3431 143.843 45 145.5 45H147C148.657 45 150 43.6569 150 42V25.5C150 23.8431 148.657 22.5 147 22.5H145.5C143.843 22.5 142.5 21.1569 142.5 19.5V10.5C142.5 8.84315 141.157 7.5 139.5 7.5H130.5C128.843 7.5 127.5 6.15685 127.5 4.5V3C127.5 1.34315 126.157 0 124.5 0H100.5C98.8431 0 97.5 1.34315 97.5 3V4.5C97.5 6.15685 96.1569 7.5 94.5 7.5H78C76.3431 7.5 75 8.84315 75 10.5V12C75 13.6569 73.6569 15 72 15H67.5H63C61.3431 15 60 16.3431 60 18V19.5C60 21.1569 58.6569 22.5 57 22.5H48C46.3431 22.5 45 23.8431 45 25.5V27C45 28.6569 43.6569 30 42 30H40.5C38.8431 30 37.5 31.3431 37.5 33V34.5C37.5 36.1569 36.1569 37.5 34.5 37.5H33C31.3431 37.5 30 38.8431 30 40.5V42C30 43.6569 28.6569 45 27 45H25.5C23.8431 45 22.5 46.3431 22.5 48V49.5C22.5 51.1569 21.1569 52.5 19.5 52.5H18C16.3431 52.5 15 53.8431 15 55.5V60V64.5C15 66.1569 13.6569 67.5 12 67.5H10.5C8.84315 67.5 7.5 68.8431 7.5 70.5V79.5C7.5 81.1569 6.15685 82.5 4.5 82.5H3C1.34315 82.5 0 83.8431 0 85.5V102C0 103.657 1.34315 105 3 105H4.5C6.15685 105 7.5 106.343 7.5 108V117C7.5 118.657 8.84315 120 10.5 120H15H19.5C21.1569 120 22.5 121.343 22.5 123V124.5C22.5 126.157 23.8431 127.5 25.5 127.5H49.5C51.1569 127.5 52.5 126.157 52.5 124.5V123C52.5 121.343 53.8431 120 55.5 120H72C73.6569 120 75 118.657 75 117V115.5Z" />
      </svg>
      <p className={labelClass()}>{label}</p>
    </div>
  )
}
