import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge class names with Tailwind CSS support
 *
 * @param inputs class names to merge
 * @returns a merged string of class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
