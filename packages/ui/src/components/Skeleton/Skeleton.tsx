import { cn } from "../../utils"
import { type SkeletonVariantProps, skeletonVariants } from "./Skeleton.variants"

/**
 * Props for the {@link Skeleton} component
 */
export interface SkeletonProps
  extends SkeletonVariantProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  ref?: React.Ref<HTMLDivElement>
}

/**
 * A pulsing placeholder shown while content loads. Use it as a building block for
 * larger loading states, e.g. a card or list item skeleton.
 *
 * @param shape The base shape: `rect` (default), `text` (one line at the current font size), or `circle`.
 * @param className Classes to set the size, radius, or colour. These override the shape defaults.
 * @returns A styled placeholder element.
 */
export const Skeleton = ({ shape, className, ...props }: SkeletonProps) => (
  <div className={cn(skeletonVariants({ shape }), className)} {...props} aria-hidden="true" />
)
