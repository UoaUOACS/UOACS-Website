"use client"

import { PlusIcon } from "@heroicons/react/24/outline"
import { Dropdown } from "@uoacs/ui"
import type { BlockValue } from "@/features/project/editor/projectForm.options"
import { preloadRichTextEditor } from "@/lib/form/fields/RichTextField"
import { Slugs } from "@/lib/payload/slugs"

export interface BlockInsertPointProps {
  onInsert: (blockType: BlockValue["blockType"]) => void
}

/**
 * A "+" button that opens a menu of block types to insert at this point
 */
export const BlockInsertPoint = ({ onInsert }: BlockInsertPointProps) => (
  // The user may pick Text, so start loading the editor early
  // biome-ignore lint/a11y/noStaticElementInteractions: preloads code on hover or focus of the menu inside, and handles no input
  <div
    className="flex justify-center"
    onFocus={preloadRichTextEditor}
    onPointerEnter={preloadRichTextEditor}
  >
    <Dropdown
      fast
      label={
        <>
          <PlusIcon aria-hidden className="size-6" />
          <span className="sr-only">Add a block</span>
        </>
      }
      options={[
        {
          label: "Text",
          onClick: () => onInsert(Slugs.Blocks.TEXT),
          theme: "ghost",
          className: "w-full justify-start",
        },
        {
          label: "Image grid",
          onClick: () => onInsert(Slugs.Blocks.IMAGE_GRID),
          theme: "ghost",
          className: "w-full justify-start",
        },
      ]}
      popoverClassName="right-auto left-1/2 -translate-x-1/2 items-stretch gap-0 rounded-lg border border-gray-200 bg-white p-1 shadow-md"
      shape="default"
      size="icon"
      theme="dark"
      trigger={false}
    />
  </div>
)
