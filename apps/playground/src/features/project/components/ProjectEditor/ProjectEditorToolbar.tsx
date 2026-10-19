"use client"

import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { Button, Dropdown } from "@uoacs/ui"
import { cn } from "@uoacs/ui/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { projectFormOptions } from "@/features/project/editor/projectForm.options"
import { withForm } from "@/lib/form/useAppForm"
import { Routes } from "@/lib/routes"
import { DeleteProjectDialog } from "./DeleteProjectDialog"

const group = "flex items-center gap-x-1 sm:gap-x-4"

export type EditorMode = "edit" | "reorder"

const modeButton = cn(
  "text-gray-500 text-sm hover:bg-transparent hover:text-gray-900",
  "aria-pressed:bg-white aria-pressed:text-gray-900 aria-pressed:shadow-sm",
  "disabled:text-gray-300 disabled:brightness-100",
)

/**
 * Sticky actions above the editor: the editor mode, discard, save, the save error, and a menu with
 * delete
 */
export const ProjectEditorToolbar = withForm({
  ...projectFormOptions,
  props: {
    /**
     * Omitted for a project that is not saved yet
     */
    projectID: undefined as string | undefined,
    /**
     * The last failed save's summary, until the next save
     */
    error: undefined as string | undefined,
    mode: "edit" as EditorMode,
    onModeChange: (_mode: EditorMode) => {},
  },
  render: function Render({ form, projectID, error, mode, onModeChange }) {
    const router = useRouter()
    const [deleteOpen, setDeleteOpen] = useState(false)

    return (
      <div
        className={cn(
          group,
          "sticky top-0 z-40 flex-wrap-reverse justify-end gap-y-2 bg-white py-3",
        )}
      >
        {error && (
          <form.Subscribe
            selector={(state) =>
              Object.values(state.fieldMeta).filter((meta) => meta?.errors.length).length
            }
          >
            {(fieldCount) => (
              <p className="mr-auto text-red-600 text-sm" role="alert">
                {error}
                {fieldCount > 0 && ` (${fieldCount})`}
              </p>
            )}
          </form.Subscribe>
        )}
        {/* Groups wrap as a whole, and in reverse, so on a narrow screen the save group is on top */}
        <form.Subscribe selector={(state) => state.values.pageContent.length}>
          {(blockCount) => (
            <fieldset aria-label="Editor mode" className="flex rounded-full bg-gray-100 p-1">
              <Button
                aria-pressed={mode === "edit"}
                className={modeButton}
                onClick={() => onModeChange("edit")}
                shape="pill"
                theme="ghost"
              >
                Edit
              </Button>
              <Button
                aria-pressed={mode === "reorder"}
                className={modeButton}
                disabled={blockCount < 2}
                onClick={() => onModeChange("reorder")}
                shape="pill"
                theme="ghost"
              >
                Reorder
              </Button>
              {/* Preview mode comes with the preview work */}
              <Button className={modeButton} disabled shape="pill" theme="ghost">
                Preview
              </Button>
            </fieldset>
          )}
        </form.Subscribe>
        <div className={group}>
          <Button
            className="max-sm:px-2"
            // Client navigation, so the unsaved changes warning does not show
            onClick={() =>
              router.push(projectID ? Routes.PROJECTS.ID(projectID) : Routes.PROFILE.ROOT)
            }
            theme="ghost"
          >
            {/* One span, as the button spaces out its children */}
            <span>
              Discard<span className="max-sm:hidden"> Changes</span>
            </span>
          </Button>
          <form.SubmitButton theme="dark">
            <span>
              {projectID ? "Update" : "Create"}
              <span className="max-sm:hidden"> Project</span>
            </span>
          </form.SubmitButton>
          {projectID && (
            <>
              <Dropdown
                label={<span className="sr-only">More actions</span>}
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
                trigger={{
                  triggerClassName: "size-8 sm:size-10",
                  triggerIcon: <EllipsisHorizontalIcon aria-hidden className="size-5 sm:size-6" />,
                }}
              />
              <DeleteProjectDialog
                onClose={() => setDeleteOpen(false)}
                open={deleteOpen}
                projectID={projectID}
              />
            </>
          )}
        </div>
      </div>
    )
  },
})
