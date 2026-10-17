"use client"

import { Button, type ButtonProps } from "@uoacs/ui"
import { useFormContext } from "../formContext"

export type SubmitButtonProps = Omit<ButtonProps, "type">

export const SubmitButton = ({ disabled, ...props }: SubmitButtonProps) => {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button
          {...props}
          aria-busy={isSubmitting || undefined}
          disabled={disabled || !canSubmit || isSubmitting}
          type="submit"
        />
      )}
    </form.Subscribe>
  )
}
