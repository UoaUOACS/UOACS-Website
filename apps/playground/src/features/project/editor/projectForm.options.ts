import { formOptions } from "@tanstack/react-form"
import { countRichTextCharacters } from "@uoacs/shared"
import type { RichTextValue } from "@uoacs/shared/payload"
import type { GalleryImage } from "@uoacs/ui"
import { toGalleryImages } from "@uoacs/ui/utils"
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
  /**
   * Image grid titles by Media ID, saved as each image's alt text
   */
  imageTitles: Record<string, string>
}

const defaultValues: EditProjectValues = {
  name: "",
  summary: "",
  coverImage: null,
  pageContent: [],
  imageTitles: {},
}

/**
 * What the editor's submit validator returns when the save fails: a summary, and messages keyed
 * by field path
 */
export type SaveErrors = { form: string; fields: Record<string, string> }

export type SaveValidator = (props: { value: EditProjectValues }) => Promise<SaveErrors | undefined>

export const projectFormOptions = formOptions({
  defaultValues,
  // Type only: `withForm` components need the editor's error types. The editor sets the validator.
  validators: {} as { onSubmitAsync?: SaveValidator },
})

export const createBlock = (blockType: BlockValue["blockType"]): BlockValue => {
  const _key = crypto.randomUUID()
  return blockType === Slugs.Blocks.TEXT
    ? { _key, blockType, content: null }
    : { _key, blockType, images: [] }
}

/**
 * A text block with no text, or an image grid with no images. Save skips these.
 */
export const isEmptyBlock = (block: BlockValue) =>
  block.blockType === Slugs.Blocks.TEXT
    ? !block.content || countRichTextCharacters(block.content) === 0
    : block.images.length === 0

/**
 * Maps a saved project, as `getEditableProject` returns it, to form values
 */
export const toFormValues = (project: Project): EditProjectValues => ({
  name: project.name,
  summary: project.summary,
  coverImage: getRelationID(project.coverImage),
  pageContent: project.pageContent.map((block): BlockValue => {
    const id = block.id ?? undefined
    const _key = id ?? crypto.randomUUID()
    return block.blockType === Slugs.Blocks.TEXT
      ? { _key, id, blockType: block.blockType, content: block.content }
      : { _key, id, blockType: block.blockType, images: block.images.map(getRelationID) }
  }),
  imageTitles: Object.fromEntries(
    Object.values(toMediaLookup(project)).map((image) => [image.id, image.alt]),
  ),
})

/**
 * Images by Media ID, so idle image grids can show the IDs that the form holds
 */
export type MediaLookup = Record<string, GalleryImage>

/**
 * The images of a saved project's image grids, as `getEditableProject` populates them
 */
export const toMediaLookup = (project: Project): MediaLookup =>
  Object.fromEntries(
    project.pageContent
      .flatMap((block) =>
        block.blockType === Slugs.Blocks.IMAGE_GRID ? toGalleryImages(block.images) : [],
      )
      .map((image) => [image.id, image]),
  )

/**
 * The input for `saveProject`. Drops `_key` and keeps `id`, so Payload keeps existing blocks.
 * Sends only the changed titles of images that are still in a grid, so an old title that is now
 * too long does not block the save.
 */
export const toSaveInput = (
  { pageContent, imageTitles, ...values }: EditProjectValues,
  id?: string,
  savedTitles: EditProjectValues["imageTitles"] = {},
) => ({
  ...values,
  id,
  pageContent: pageContent.map(({ _key, ...block }) => block),
  imageTitles: Object.fromEntries(
    pageContent
      .flatMap((block) => (block.blockType === Slugs.Blocks.IMAGE_GRID ? block.images : []))
      .flatMap((mediaID) =>
        imageTitles[mediaID] === undefined || imageTitles[mediaID] === savedTitles[mediaID]
          ? []
          : [[mediaID, imageTitles[mediaID]]],
      ),
  ),
})
