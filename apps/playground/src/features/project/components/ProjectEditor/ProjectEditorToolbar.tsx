"use client"

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { Button, Dropdown } from "@uoacs/ui"
import { useState } from "react"
import { projectFormOptions } from "@/features/project/editor/projectForm.options"
import { getFieldError } from "@/lib/form/formContext"
import { withForm } from "@/lib/form/useAppForm"
import { DeleteProjectDialog } from "./DeleteProjectDialog"

/**
 * Sticky actions above the editor: preview, save, the save error, and a menu with delete
 */
export const ProjectEditorToolbar = withForm({
  ...projectFormOptions,
  props: {
    /**
     * Omitted for a project that is not saved yet
     */
    projectID: undefined as string | undefined,
  },
  render: function Render({ form, projectID }) {
    const [deleteOpen, setDeleteOpen] = useState(false)

    return (
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-end gap-x-4 gap-y-2 bg-white py-3">
        <form.Subscribe
          selector={(state) => ({
            message: getFieldError([state.errorMap.onSubmit]),
            fieldCount: Object.values(state.fieldMeta).filter((meta) => meta?.errors.length).length,
          })}
        >
          {({ message, fieldCount }) =>
            message ? (
              <p className="mr-auto text-red-600 text-sm" role="alert">
                {message}
                {fieldCount > 0 && ` (${fieldCount})`}
              </p>
            ) : null
          }
        </form.Subscribe>
        {/* Preview mode comes with the reorder and preview work */}
        <Button className="disabled:text-gray-400" disabled size="md" theme="ghost">
          Preview
        </Button>
        <form.SubmitButton shape="pill" size="md" theme="dark">
          {projectID ? "Update Project" : "Create Project"}
        </form.SubmitButton>
        {projectID && (
          <>
            <Dropdown
              label={
                <>
                  <EllipsisHorizontalIcon aria-hidden className="size-6" />
                  <span className="sr-only">More actions</span>
                </>
              }
              options={[
                {
                  label: "Delete project",
                  onClick: () => setDeleteOpen(true),
                  theme: "ghost",
                  className: "w-full text-red-600",
                },
              ]}
              popoverClassName="items-stretch gap-0 rounded-lg border border-gray-200 bg-white p-1 shadow-md"
              shape="pill"
              size="icon"
              theme="ghost"
              trigger={false}
            />
            <DeleteProjectDialog
              onClose={() => setDeleteOpen(false)}
              open={deleteOpen}
              projectID={projectID}
            />
          </>
        )}
      </div>
    )
  },
})
