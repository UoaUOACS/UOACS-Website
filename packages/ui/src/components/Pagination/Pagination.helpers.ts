/**
 * A page number, or a collapsed run of pages shown as an ellipsis.
 */
export type PageItem = number | "ellipsis-start" | "ellipsis-end"

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)

/**
 * Builds the list of items to show in a {@link Pagination} control. The first and last page are
 * always shown, along with `siblingCount` pages either side of the current page, e.g. page 3 of
 * 300 gives `[1, 2, 3, 4, 5, "ellipsis-end", 300]`.
 *
 * The result always has the same length once pages start collapsing, so the control doesn't
 * change width as the user moves between pages.
 *
 * @param page The current page (1-indexed).
 * @param totalPages The total number of pages.
 * @param siblingCount How many pages to show either side of the current page.
 * @returns The page numbers and ellipses to render, in order.
 */
export const getPageItems = (page: number, totalPages: number, siblingCount = 1): PageItem[] => {
  // First, last, current, its siblings, and an ellipsis on each side
  const maxItems = siblingCount * 2 + 5
  if (totalPages <= maxItems) return range(1, totalPages)

  const start = Math.max(page - siblingCount, 1)
  const end = Math.min(page + siblingCount, totalPages)
  // Only collapse gaps of two or more pages, since an ellipsis in place of one page saves nothing
  const showStartEllipsis = start > 3
  const showEndEllipsis = end < totalPages - 2
  const edgeCount = siblingCount * 2 + 3

  if (!showStartEllipsis) return [...range(1, edgeCount), "ellipsis-end", totalPages]
  if (!showEndEllipsis) {
    return [1, "ellipsis-start", ...range(totalPages - edgeCount + 1, totalPages)]
  }
  return [1, "ellipsis-start", ...range(start, end), "ellipsis-end", totalPages]
}
