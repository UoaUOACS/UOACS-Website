"use client"

import type { GalleryImage } from "@uoacs/ui"
import { Fragment } from "react"
import {
  createBlock,
  type MediaLookup,
  projectFormOptions,
} from "@/features/project/editor/projectForm.options"
import { PROJECT_MAX_BLOCKS } from "@/features/project/project.constants"
import { getFieldError } from "@/lib/form/formContext"
import { withForm } from "@/lib/form/useAppForm"
import { BlockFrame } from "./BlockFrame"
import { BlockInsertPoint } from "./BlockInsertPoint"

/**
 * The page's blocks, with a "+" insert point before, between and after them
 */
export const BlockList = withForm({
  ...projectFormOptions,
  props: {
    /**
     * The `_key` of the block whose editor is open
     */
    activeKey: null as string | null,
    onActiveKeyChange: (_key: string | null) => {},
    media: {} as MediaLookup,
    onUpload: (_image: GalleryImage) => {},
  },
  render: ({ form, activeKey, onActiveKeyChange, media, onUpload }) => (
    <form.Field mode="array" name="pageContent">
      {(field) => {
        const blocks = field.state.value
        const error = getFieldError(field.state.meta.errors)
        const canInsert = blocks.length < PROJECT_MAX_BLOCKS
        const insertPoint = (index: number) =>
          canInsert && (
            <BlockInsertPoint
              onInsert={(blockType) => {
                const block = createBlock(blockType)
                field.insertValue(index, block)
                onActiveKeyChange(block._key)
              }}
            />
          )

        return (
          <section
            aria-label="Page content"
            className="flex min-h-80 flex-col items-center gap-6 rounded-md border border-gray-200 px-4 py-8 md:px-12"
          >
            {blocks.length === 0 && (
              <p className="paragraph text-gray-500">Add your first block to build the page.</p>
            )}
            {insertPoint(0)}
            {blocks.map((block, index) => (
              <Fragment key={block._key}>
                <BlockFrame
                  active={block._key === activeKey}
                  form={form}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === blocks.length - 1}
                  media={media}
                  onActivate={() => onActiveKeyChange(block._key)}
                  onDeactivate={() => onActiveKeyChange(null)}
                  onDelete={() => {
                    field.removeValue(index)
                    if (block._key === activeKey) onActiveKeyChange(null)
                  }}
                  onMove={(to) => field.moveValue(index, to)}
                  onUpload={onUpload}
                />
                {insertPoint(index + 1)}
              </Fragment>
            ))}
            {!canInsert && (
              <p className="text-gray-500 text-sm">
                A page can have {PROJECT_MAX_BLOCKS} blocks. Delete one to add another.
              </p>
            )}
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </section>
        )
      }}
    </form.Field>
  ),
})
