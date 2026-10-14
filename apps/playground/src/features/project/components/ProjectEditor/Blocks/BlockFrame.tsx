"use client"

import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { useSelector } from "@tanstack/react-form"
import { Dropdown, type DropdownProps, type GalleryImage } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import { useEffect, useRef } from "react"
import { ImageGridBlockView } from "@/features/project/components/BlockViews/ImageGridBlockView"
import { TextBlockView } from "@/features/project/components/BlockViews/TextBlockView"
import { type MediaLookup, projectFormOptions } from "@/features/project/editor/projectForm.options"
import { preloadRichTextEditor } from "@/lib/form/fields/RichTextField"
import { getFieldError } from "@/lib/form/formContext"
import { withForm } from "@/lib/form/useAppForm"
import { Slugs } from "@/lib/payload/slugs"
import { ImageGridBlockEditor } from "./ImageGridBlockEditor"
import { TextBlockEditor } from "./TextBlockEditor"

/**
 * The DOM ID of a block's frame, to scroll to it
 */
export const blockElementID = (key: string) => `block-${key}`

const menuOption = (
  label: string,
  onClick: () => void,
  className?: string,
): DropdownProps["options"][number] => ({
  label,
  onClick,
  theme: "ghost",
  className: cn("w-full justify-start", className),
})

/**
 * One block in the editor. Idle blocks show the block view, so only the active block mounts an
 * editor.
 */
export const BlockFrame = withForm({
  ...projectFormOptions,
  props: {
    index: 0,
    isFirst: false,
    isLast: false,
    active: false,
    media: {} as MediaLookup,
    onActivate: () => {},
    onDeactivate: () => {},
    onMove: (_to: number) => {},
    onDelete: () => {},
    onUpload: (_image: GalleryImage) => {},
  },
  render: function Render({
    form,
    index,
    isFirst,
    isLast,
    active,
    media,
    onActivate,
    onDeactivate,
    onMove,
    onDelete,
    onUpload,
  }) {
    // The list only re-renders when blocks are added, moved or removed
    const block = useSelector(form.store, (state) => state.values.pageContent[index])
    // Server errors are set for blocks that have no mounted field, so read them from the form
    const error = useSelector(form.store, (state) => {
      const prefix = `pageContent[${index}]`
      for (const [name, meta] of Object.entries(state.fieldMeta)) {
        if (!name.startsWith(prefix) || ![undefined, "."].includes(name[prefix.length])) continue
        const message = getFieldError(meta?.errors ?? [])
        if (message) return message
      }
      return undefined
    })
    const editButton = useRef<HTMLButtonElement>(null)
    const closedByEscape = useRef(false)

    // On the window, as focus can leave the block, e.g. when a removed image's button unmounts
    useEffect(() => {
      if (!active) return
      const close = (event: KeyboardEvent) => {
        // An open menu or dialog closes first
        if (event.key !== "Escape" || event.defaultPrevented) return
        if (event.target instanceof Element && event.target.closest("dialog")) return
        closedByEscape.current = true
        onDeactivate()
      }
      window.addEventListener("keydown", close)
      return () => window.removeEventListener("keydown", close)
    }, [active, onDeactivate])

    // Back to the block once its view shows, so keyboard users keep their place
    useEffect(() => {
      if (active || !closedByEscape.current) return
      closedByEscape.current = false
      editButton.current?.focus()
    }, [active])

    if (!block) return null

    const isText = block.blockType === Slugs.Blocks.TEXT
    const label = `${isText ? "Text" : "Image grid"} block ${index + 1}`
    const isEmpty = isText ? !block.content : block.images.length === 0

    const options = [
      ...(active ? [] : [menuOption("Edit", onActivate)]),
      ...(isFirst ? [] : [menuOption("Move up", () => onMove(index - 1))]),
      ...(isLast ? [] : [menuOption("Move down", () => onMove(index + 1))]),
      menuOption("Delete", onDelete, "text-red-600"),
    ]

    return (
      <div className="relative flex w-full items-start gap-2" id={blockElementID(block._key)}>
        <div className="flex min-w-0 grow flex-col gap-2">
          <div
            className={cn(
              "relative rounded-xl",
              error && "outline-2 outline-red-600 outline-offset-4",
              // Skips layout and paint for idle blocks off screen, for long pages
              !active && "[contain-intrinsic-block-size:auto_24rem] [content-visibility:auto]",
            )}
          >
            {active ? (
              isText ? (
                <TextBlockEditor form={form} index={index} />
              ) : (
                <ImageGridBlockEditor
                  blockKey={block._key}
                  form={form}
                  index={index}
                  media={media}
                  onUpload={onUpload}
                />
              )
            ) : (
              <>
                {isEmpty ? (
                  <p className="flex min-h-24 items-center justify-center rounded-xl border border-gray-300 border-dashed text-gray-500 text-sm">
                    {isText ? "Click to write" : "Click to add images"}
                  </p>
                ) : isText ? (
                  <TextBlockView content={block.content} />
                ) : (
                  <ImageGridBlockView images={block.images.flatMap((id) => media[id] ?? [])} />
                )}
                {/* Covers the view, so a click anywhere or Enter opens the editor */}
                <button
                  aria-label={`Edit ${label}`}
                  className="absolute inset-0 cursor-text rounded-xl hover:bg-black/3"
                  onClick={onActivate}
                  onFocus={isText ? preloadRichTextEditor : undefined}
                  onPointerEnter={isText ? preloadRichTextEditor : undefined}
                  ref={editButton}
                  type="button"
                />
              </>
            )}
          </div>
          {error && !active && <p className="text-red-600 text-sm">{error}</p>}
        </div>
        {/* Over the block's corner on mobile, so the content gets the full width */}
        <div className="absolute top-2 right-2 md:static">
          <Dropdown
            fast
            label={
              <>
                <PencilSquareIcon aria-hidden className="size-6" />
                <span className="sr-only">{label} actions</span>
              </>
            }
            options={options}
            popoverClassName="items-stretch gap-0 rounded-lg border border-gray-200 bg-white p-1 shadow-md"
            shape="default"
            size="icon"
            theme="dark"
            trigger={false}
          />
        </div>
      </div>
    )
  },
})
