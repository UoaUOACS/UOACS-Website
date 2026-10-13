import type { AnyFormApi } from "@tanstack/react-form"
import { useEffect } from "react"

// Keyed by store: `useAppForm` returns a copy of the `FormApi` that `field.form` points to
const pending = new WeakMap<AnyFormApi["store"], Set<() => void>>()

/**
 * Registers a field's flush, so {@link submitForm} writes its debounced value before submitting
 */
export const useFlushOnSubmit = (form: AnyFormApi, flush: () => void) => {
  useEffect(() => {
    const flushes = pending.get(form.store) ?? new Set()
    pending.set(form.store, flushes)
    flushes.add(flush)
    return () => {
      flushes.delete(flush)
    }
  }, [form, flush])
}

/**
 * Flushes debounced field values, then submits. Use this in place of `form.handleSubmit()`, as
 * Enter or a shortcut submits without blurring the field first.
 */
export const submitForm = (form: AnyFormApi) => {
  for (const flush of pending.get(form.store) ?? []) flush()
  return form.handleSubmit()
}
