"use client"

import { useSelector } from "@tanstack/react-form"
import { toast } from "@uoacs/ui/toast"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { type SaveProjectResult, saveProject } from "@/features/project/actions/saveProject"
import {
  type EditProjectValues,
  type MediaLookup,
  projectFormOptions,
  type SaveValidator,
  toSaveInput,
} from "@/features/project/editor/projectForm.options"
import { preloadRichTextEditor } from "@/lib/form/fields/RichTextField"
import { submitForm } from "@/lib/form/flush"
import { useAppForm } from "@/lib/form/useAppForm"
import { Routes } from "@/lib/routes"
import { blockElementID } from "./Blocks/BlockFrame"
import { BlockList } from "./Blocks/BlockList"
import { ProjectEditorToolbar } from "./ProjectEditorToolbar"
import { ProjectHeaderEditor } from "./ProjectHeaderEditor/ProjectHeaderEditor"

const SAVE_ERROR_MESSAGES: Record<Extract<SaveProjectResult, { ok: false }>["error"], string> = {
  invalid: "Fix the highlighted fields",
  unauthenticated: "Sign in again to save",
  unavailable: "We could not check your session. Try again.",
  "not-found": "This project no longer exists",
  server: "Something went wrong. Try again.",
}

export interface ProjectEditorProps {
  /**
   * Omitted when creating a project
   */
  projectID?: string
  initialValues: EditProjectValues
  /**
   * The saved cover image, shown until a new one is picked
   */
  coverImageURL?: string
  /**
   * The saved images of the page's image grids
   */
  media?: MediaLookup
}

const BLOCK_ERROR_PATH = /^pageContent\[(\d+)\]/

/**
 * The index of the first block with an error, if any
 */
const firstBlockWithError = (fieldErrors: Record<string, string>) => {
  const indexes = Object.keys(fieldErrors).flatMap((path) => {
    const match = BLOCK_ERROR_PATH.exec(path)
    return match ? [Number(match[1])] : []
  })
  return indexes.length > 0 ? Math.min(...indexes) : undefined
}

export const ProjectEditor = ({
  projectID,
  initialValues,
  coverImageURL,
  media: initialMedia = {},
}: ProjectEditorProps) => {
  const router = useRouter()
  // Set by the first save on create, so a second save before the redirect updates that project
  const savedID = useRef(projectID)
  // Only this block mounts an editor
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [media, setMedia] = useState(initialMedia)

  const showBlock = (index: number) => {
    const key = form.state.values.pageContent[index]?._key
    if (!key) return
    setActiveKey(key)
    // Instant: a smooth scroll aims at the sizes that idle blocks guess before they render
    requestAnimationFrame(() =>
      document
        .getElementById(blockElementID(key))
        ?.scrollIntoView({ block: "center", behavior: "instant" }),
    )
  }

  // Saves in the validator, so the server's errors land on the form and its fields
  const save: SaveValidator = async ({ value }) => {
    const result = await saveProject(toSaveInput(value, savedID.current))
    if (!result.ok) {
      const index = firstBlockWithError(result.fieldErrors ?? {})
      if (index !== undefined) showBlock(index)
      return { form: SAVE_ERROR_MESSAGES[result.error], fields: result.fieldErrors ?? {} }
    }
    savedID.current = result.id
    return undefined
  }

  const form = useAppForm({
    ...projectFormOptions,
    defaultValues: initialValues,
    validators: { onSubmitAsync: save },
    // A failed save sets a submit error, which would disable the button until a field changes
    canSubmitWhenInvalid: true,
    onSubmit: ({ value }) => {
      const id = savedID.current
      if (!id) return
      // Not dirty, so leaving does not warn about unsaved changes
      form.reset(value)
      toast.success({ description: "Saved" })
      router.push(Routes.PROJECTS.ID(id))
    },
  })

  // Most edits open a text block, so load the editor once the page is idle.
  useEffect(() => {
    if (!("requestIdleCallback" in window)) return preloadRichTextEditor() // safari has no requestIdleCallback
    const id = requestIdleCallback(preloadRichTextEditor)
    return () => cancelIdleCallback(id)
  }, [])

  const isDirty = useSelector(form.store, (state) => state.isDirty)
  useEffect(() => {
    if (!isDirty) return
    const warn = (event: BeforeUnloadEvent) => event.preventDefault()
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [isDirty])

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault()
        void submitForm(form)
      }}
    >
      <form.AppForm>
        <ProjectEditorToolbar form={form} projectID={projectID} />
        <div className="flex flex-col gap-12 md:gap-15">
          <ProjectHeaderEditor coverImageURL={coverImageURL} form={form} />
          <BlockList
            activeKey={activeKey}
            form={form}
            media={media}
            onActiveKeyChange={setActiveKey}
            onUpload={(image) => setMedia((current) => ({ ...current, [image.id]: image }))}
          />
        </div>
      </form.AppForm>
    </form>
  )
}
