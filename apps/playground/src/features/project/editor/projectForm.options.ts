import { formOptions } from "@tanstack/react-form"
import type { RichTextValue } from "@uoacs/shared/payload"
import { getRelationID } from "@/lib/payload/getRelationID"
import { Slugs } from "@/lib/payload/slugs"
import type { Project } from "@/payload/payload-types"

/**
 * `_key` is a client-only React key: the Payload block `id` for saved blocks, a new UUID
 * otherwise. Never key blocks by index, as a reorder would remount their editors.
 */
export type TextBlockValue = {
  _key: string
  id?: string
  blockType: typeof Slugs.Blocks.TEXT
  content: RichTextValue | null
}

export type ImageGridBlockValue = {
  _key: string
  id?: string
  blockType: typeof Slugs.Blocks.IMAGE_GRID
  images: string[] // Media IDs
}

export type BlockValue = TextBlockValue | ImageGridBlockValue

export type EditProjectValues = {
  name: string
  summary: string
  coverImage: string | null // Media ID
  pageContent: BlockValue[]
}

const defaultValues: EditProjectValues = {
  name: "",
  summary: "",
  coverImage: null,
  pageContent: [],
}

export const projectFormOptions = formOptions({ defaultValues })

export const createBlock = (blockType: BlockValue["blockType"]): BlockValue => {
  const _key = crypto.randomUUID()
  return blockType === Slugs.Blocks.TEXT
    ? { _key, blockType, content: null }
    : { _key, blockType, images: [] }
}

/**
 * Maps a saved project, as `getEditableProject` returns it, to form values
 */
export const toFormValues = (project: Project): EditProjectValues => ({
  name: project.name,
  summary: project.summary,
  coverImage: getRelationID(project.coverImage),
  pageContent: project.pageContent.map((block): BlockValue => {
    const id = block.id ?? crypto.randomUUID()
    return block.blockType === Slugs.Blocks.TEXT
      ? { _key: id, id, blockType: block.blockType, content: block.content }
      : { _key: id, id, blockType: block.blockType, images: block.images.map(getRelationID) }
  }),
})

/**
 * The input for `saveProject`. Drops `_key` and keeps `id`, so Payload keeps existing blocks.
 */
export const toSaveInput = ({ pageContent, ...values }: EditProjectValues, id?: string) => ({
  ...values,
  id,
  pageContent: pageContent.map(({ _key, ...block }) => block),
})
