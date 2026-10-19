"use client"

import type { GalleryImage } from "@uoacs/ui"
import {
  Activity,
  Fragment,
  lazy,
  type SetStateAction,
  Suspense,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react"
import {
  createBlock,
  type MediaLookup,
  projectFormOptions,
} from "@/features/project/editor/projectForm.options"
import { PROJECT_MAX_BLOCKS } from "@/features/project/project.constants"
import { getFieldError } from "@/lib/form/formContext"
import { withForm } from "@/lib/form/useAppForm"
import { BlockFrame, blockElementID } from "./BlockFrame"
import { BlockInsertPoint } from "./BlockInsertPoint"
import type { PendingImage } from "./ImageGridBlockEditor"

const ReorderBlockList = lazy(() =>
  import("./ReorderBlockList").then((mod) => ({ default: mod.ReorderBlockList })),
)

/**
 * The page's blocks, with an insert point before, between and after them,
 * or as compact rows to reorder
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
    reordering: false,
    /**
     * The `_key` of the block that reorder mode opened from, to scroll to it
     */
    reorderKey: null as string | null,
    onReorder: (_key: string) => {},
  },
  render: function Render({
    form,
    activeKey,
    onActiveKeyChange,
    media,
    onUpload,
    reordering,
    reorderKey,
    onReorder,
  }) {
    const section = useRef<HTMLElement>(null)
    // Uploads that are running or failed, by block key. Here, not in each frame, as a hidden
    // frame's effects clean up as if it unmounted.
    const [pendingImages, setPendingImages] = useState<Record<string, PendingImage[]>>({})
    const setPending = (key: string) => (action: SetStateAction<PendingImage[]>) =>
      setPendingImages(({ [key]: current = [], ...rest }) => {
        const next = typeof action === "function" ? action(current) : action
        return next.length > 0 ? { ...rest, [key]: next } : rest
      })
    const releasePreviews = (key: string) => {
      for (const image of pendingImages[key] ?? []) URL.revokeObjectURL(image.previewURL)
      setPending(key)([])
    }
    // Reads the latest uploads, so leaving the editor releases the previews it still holds
    const releaseAllPreviews = useEffectEvent(() => {
      for (const images of Object.values(pendingImages)) {
        for (const image of images) URL.revokeObjectURL(image.previewURL)
      }
    })
    useEffect(() => () => releaseAllPreviews(), [])

    return (
      <form.Field mode="array" name="pageContent">
        {(field) => {
          const blocks = field.state.value
          const error = getFieldError(field.state.meta.errors)
          const canInsert = blocks.length < PROJECT_MAX_BLOCKS
          const insertPoint = (index: number) =>
            canInsert && (
              <BlockInsertPoint
                between={index < blocks.length}
                onInsert={(blockType) => {
                  const block = createBlock(blockType)
                  field.insertValue(index, block)
                  onActiveKeyChange(block._key)
                }}
              />
            )

          return (
            <>
              {reordering && (
                <Suspense>
                  <ReorderBlockList focusKey={reorderKey} form={form} media={media} />
                </Suspense>
              )}
              {/* Hidden, not unmounted, so the frames keep their state. Updates to them wait while
              reorder mode moves blocks. */}
              <Activity mode={reordering ? "hidden" : "visible"}>
                <section
                  aria-label="Page content"
                  className="flex min-h-80 flex-col items-center gap-2 rounded-md border border-gray-200 px-4 py-8 md:px-12"
                  ref={section}
                >
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
                          const next = blocks[index + 1]
                          field.removeValue(index)
                          releasePreviews(block._key)
                          if (block._key === activeKey) onActiveKeyChange(null)
                          // The focused Remove option unmounts with the frame, so focus the next block,
                          // or the insert point at the end once it renders
                          requestAnimationFrame(() => {
                            const frame = next && document.getElementById(blockElementID(next._key))
                            const target = frame
                              ? frame.querySelector("button")
                              : Array.from(section.current?.querySelectorAll("button") ?? []).at(-1)
                            target?.focus()
                          })
                        }}
                        onMove={(to) => field.moveValue(index, to)}
                        onReorder={() => onReorder(block._key)}
                        onUpload={onUpload}
                        pending={pendingImages[block._key] ?? []}
                        setPending={setPending(block._key)}
                      />
                      {insertPoint(index + 1)}
                    </Fragment>
                  ))}
                  {!canInsert && (
                    <p className="text-gray-500 text-sm">
                      A page can have {PROJECT_MAX_BLOCKS} sections. Delete one to add another.
                    </p>
                  )}
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                </section>
              </Activity>
            </>
          )
        }}
      </form.Field>
    )
  },
})
