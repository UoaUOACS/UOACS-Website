"use client"

import { useSelector } from "@tanstack/react-form"
import { toast } from "@uoacs/ui/toast"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { type SaveProjectResult, saveProject } from "@/features/project/actions/saveProject"
import {
  type EditProjectValues,
  projectFormOptions,
  type SaveValidator,
  toSaveInput,
} from "@/features/project/editor/projectForm.options"
import { submitForm } from "@/lib/form/flush"
import { getFieldError } from "@/lib/form/formContext"
import { useAppForm } from "@/lib/form/useAppForm"
import { Routes } from "@/lib/routes"
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
}

export const ProjectEditor = ({ projectID, initialValues, coverImageURL }: ProjectEditorProps) => {
  const router = useRouter()
  // Set by the first save on create, so a second save before the redirect updates that project
  const savedID = useRef(projectID)

  // Saves in the validator, so the server's errors land on the form and its fields
  const save: SaveValidator = async ({ value }) => {
    const result = await saveProject(toSaveInput(value, savedID.current))
    if (!result.ok) {
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
        <div className="flex flex-col gap-15">
          <ProjectHeaderEditor coverImageURL={coverImageURL} form={form} />
          <form.Field mode="array" name="pageContent">
            {(field) => {
              const error = getFieldError(field.state.meta.errors)
              return (
                <section
                  aria-label="Page content"
                  className="flex min-h-80 flex-col items-center justify-center gap-2 rounded-md border border-gray-200 p-8 text-center"
                >
                  {/* Block editing fills this in */}
                  <p className="paragraph text-gray-500">Blocks you add show here.</p>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                </section>
              )
            }}
          </form.Field>
        </div>
      </form.AppForm>
    </form>
  )
}
