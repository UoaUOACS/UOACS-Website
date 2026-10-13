"use client"

import { Input, type InputProps } from "@uoacs/ui"
import { getFieldError, useFieldContext } from "../formContext"

export type TextFieldProps = Omit<InputProps, "name" | "value" | "onChange" | "onBlur" | "error">

export const TextField = (props: TextFieldProps) => {
  const field = useFieldContext<string>()
  return (
    <Input
      {...props}
      error={getFieldError(field.state.meta.errors)}
      name={field.name}
      onBlur={field.handleBlur}
      onChange={(e) => field.handleChange(e.target.value)}
      value={field.state.value}
    />
  )
}
