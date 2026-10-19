"use client"

import {
  type Announcements,
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Bars2Icon, EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { useSelector } from "@tanstack/react-form"
import { Dropdown } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import { useEffect, useId } from "react"
import { ImageGridBlockView } from "@/features/project/components/BlockViews/ImageGridBlockView"
import { TextBlockView } from "@/features/project/components/BlockViews/TextBlockView"
import {
  type BlockValue,
  type MediaLookup,
  projectFormOptions,
  toGridImages,
} from "@/features/project/editor/projectForm.options"
import { withForm } from "@/lib/form/useAppForm"
import { Slugs } from "@/lib/payload/slugs"
import { blockLabel, menuOption } from "./BlockFrame"

/**
 * The DOM ID of a block's row, apart from its frame's, as the frames stay mounted while hidden
 */
const reorderRowID = (key: string) => `reorder-${key}`

/**
 * The page's blocks as compact rows, sorted by drag, keyboard or each row's move to top and bottom
 */
export const ReorderBlockList = withForm({
  ...projectFormOptions,
  props: {
    media: {} as MediaLookup,
    /**
     * The `_key` of the block to scroll to and focus when the list opens
     */
    focusKey: null as string | null,
  },
  render: function Render({ form, media, focusKey }) {
    const dndID = useId()
    const imageTitles = useSelector(form.store, (state) => state.values.imageTitles)
    // A click on a card does not pick it up.
    // A touch drag needs a long press, so a swipe over the cards still scrolls the page.
    const sensors = useSensors(
      useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
      useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
      useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    useEffect(() => {
      if (!focusKey) return
      const row = document.getElementById(reorderRowID(focusKey))
      row?.scrollIntoView({ block: "center", behavior: "instant" })
      row?.querySelector<HTMLElement>("[aria-roledescription]")?.focus({ preventScroll: true })
    }, [focusKey])

    return (
      <form.Field mode="array" name="pageContent">
        {(field) => {
          const blocks = field.state.value
          const keys = blocks.map((block) => block._key)
          const indexOf = (id: UniqueIdentifier) => keys.indexOf(String(id))
          const labelOf = (id: UniqueIdentifier) => {
            const index = indexOf(id)
            return blockLabel(blocks[index], index)
          }
          // Positions, as the default announcements read out the block key
          const announcements: Announcements = {
            onDragStart: ({ active }) => `Picked up ${labelOf(active.id)}.`,
            onDragOver: ({ active, over }) =>
              over ? `${labelOf(active.id)} is over position ${indexOf(over.id) + 1}.` : undefined,
            onDragEnd: ({ active, over }) =>
              over
                ? `Moved ${labelOf(active.id)} to position ${indexOf(over.id) + 1}.`
                : `Dropped ${labelOf(active.id)}.`,
            onDragCancel: ({ active }) => `Cancelled. ${labelOf(active.id)} is back in its place.`,
          }

          const move = (from: number, to: number) => {
            field.moveValue(from, to)
            // Follows the row to its new place. The menu option unmounts, so focus its menu button.
            requestAnimationFrame(() => {
              const row = document.getElementById(reorderRowID(keys[from]))
              row?.scrollIntoView({ block: "nearest", behavior: "instant" })
              row?.querySelector<HTMLElement>("[aria-expanded]")?.focus({ preventScroll: true })
            })
          }

          return (
            <section
              aria-label="Page content"
              className="flex flex-col rounded-md border border-gray-200 px-4 py-8 md:px-12"
            >
              <p className="mb-4 text-gray-500 text-sm">
                Drag sections to reorder, or use ⋮ to move one to the top or bottom.
              </p>
              <DndContext
                accessibility={{ announcements }}
                collisionDetection={closestCenter}
                id={dndID}
                onDragEnd={({ active, over }) => {
                  if (!over || active.id === over.id) return
                  field.moveValue(indexOf(active.id), indexOf(over.id))
                }}
                sensors={sensors}
              >
                <ol aria-label="Sections" className="flex flex-col gap-2">
                  <SortableContext items={keys} strategy={verticalListSortingStrategy}>
                    {blocks.map((block, index) => (
                      <SortableBlockRow
                        block={block}
                        imageTitles={imageTitles}
                        index={index}
                        key={block._key}
                        media={media}
                        onMove={(to) => move(index, to)}
                        total={blocks.length}
                      />
                    ))}
                  </SortableContext>
                </ol>
              </DndContext>
            </section>
          )
        }}
      </form.Field>
    )
  },
})

const SortableBlockRow = ({
  block,
  imageTitles,
  index,
  media,
  onMove,
  total,
}: {
  block: BlockValue
  imageTitles: Record<string, string>
  index: number
  media: MediaLookup
  onMove: (to: number) => void
  total: number
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform, transition } = useSortable({
    id: block._key,
  })
  const label = blockLabel(block, index)

  return (
    <li
      className={cn("flex items-center gap-2", isDragging && "relative z-10 opacity-80")}
      id={reorderRowID(block._key)}
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
    >
      {/* Room on the left of the view for the grip */}
      <div
        className={cn("relative min-w-0 grow rounded-xl [&>div]:pl-12", isDragging && "shadow-lg")}
      >
        {block.blockType === Slugs.Blocks.TEXT ? (
          <TextBlockView compact content={block.content} />
        ) : (
          <ImageGridBlockView compact images={toGridImages(block.images, media, imageTitles)} />
        )}
        {/* Over the view, as LazyImage's div cannot go in a button, so the whole card drags */}
        <button
          aria-label={`Move ${label}`}
          className="absolute inset-0 flex cursor-grab items-center rounded-xl pl-4 text-gray-400 hover:bg-black/3 hover:text-gray-600 active:cursor-grabbing"
          type="button"
          {...attributes}
          {...listeners}
        >
          <Bars2Icon aria-hidden className="size-5" />
        </button>
      </div>
      <Dropdown
        fast
        label={<span className="sr-only">{label} actions</span>}
        options={[
          ...(index === 0 ? [] : [menuOption("Move to top", () => onMove(0))]),
          ...(index === total - 1 ? [] : [menuOption("Move to bottom", () => onMove(total - 1))]),
        ]}
        popoverClassName="items-stretch gap-0 rounded-lg border border-gray-200 bg-white p-1 shadow-md"
        shape="pill"
        size="icon"
        theme="ghost"
        trigger={{
          triggerClassName: "size-8 shrink-0 text-gray-500",
          triggerIcon: <EllipsisVerticalIcon aria-hidden className="size-5" />,
        }}
      />
    </li>
  )
}
