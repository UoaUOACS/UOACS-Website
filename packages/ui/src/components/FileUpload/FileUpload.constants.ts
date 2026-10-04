import type { FileRejectionReason } from "./FileUpload"

/**
 * User-facing description for each file rejection reason, e.g. for a toast.
 */
export const FILE_REJECTION_MESSAGES: Record<FileRejectionReason, string> = {
  type: "This file type is not allowed",
  size: "This file is too large",
  count: "Too many files selected",
  duplicate: "This file has already been added",
}
