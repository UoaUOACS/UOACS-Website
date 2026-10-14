"use client"

import { projectFormOptions } from "@/features/project/editor/projectForm.options"
import { TEXT_BLOCK_MAX_CHARACTERS } from "@/features/project/project.constants"
import { withForm } from "@/lib/form/useAppForm"

export const TextBlockEditor = withForm({
  ...projectFormOptions,
  props: { index: 0 },
  render: ({ form, index }) => (
    <form.AppField name={`pageContent[${index}].content`}>
      {(field) => (
        <field.RichTextField
          autoFocus
          label={`Text block ${index + 1}`}
          maxCharacters={TEXT_BLOCK_MAX_CHARACTERS}
          placeholder="Write about your project"
        />
      )}
    </form.AppField>
  ),
})
