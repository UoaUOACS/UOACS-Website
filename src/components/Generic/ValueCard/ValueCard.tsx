import { Heading } from "@/components/Primitive"

/**
 * Props for the ValueCard component.
 */
export interface ValueCardProps {
  /**
   * The title of the value card.
   */
  title: string
  /**
   * The colour variant of the value card border.
   */
  colour: "purple" | "blue" | "red" | "yellow"
  /**
   * The content of the value card.
   * Should provide minimal structure, as the ValueCard component handles most styling.
   */
  children: React.ReactNode
}

const borderColourClasses: Record<ValueCardProps["colour"], string> = {
  purple: "border-accent-purple",
  blue: "border-accent-blue",
  red: "border-accent-red",
  yellow: "border-accent-yellow",
}

/**
 * A card component to display a value with a title and content.
 * For use in the Values section of the homepage.
 *
 * @param title The title of the value card.
 * @param colour The colour variant of the value card border.
 * @param children The content of the value card. Should provide minimal structure, as the ValueCard component handles most styling.
 * @returns A card component to display a value with a title and content.
 * @example
 * ```tsx
 * <ValueCard title="Collaborate" colour="purple">
 *   <p>Line 1</p>
 *   <p>Line 2</p>
 * </ValueCard>
 * ```
 */
export const ValueCard = ({ title, colour, children }: ValueCardProps) => {
  return (
    <div
      className={`flex w-full max-w-75 flex-col border-6 md:max-w-132 ${borderColourClasses[colour]}`}
    >
      <Heading className="!justify-start !text-left border-b-1 border-b-secondary-light p-3" h={4}>
        {title}
      </Heading>
      <div className="px-3 py-6 font-light font-switzer text-xl leading-none">{children}</div>
    </div>
  )
}
