import type { AnyFormApi } from "@tanstack/react-form"
import { useEffect } from "react"

// Keyed by store: `useAppForm` returns a copy of the `FormApi` that `field.form` points to
const pending = new WeakMap<AnyFormApi["store"], Set<() => void | Promise<void>>>()

/**
 * Registers a field's flush, so {@link submitForm} writes its pending value before submitting.
 * Return a promise to make the submit wait, e.g. for an upload.
 */
export const useFlushOnSubmit = (form: AnyFormApi, flush: () => void | Promise<void>) => {
  useEffect(() => {
    const flushes = pending.get(form.store) ?? new Set()
    pending.set(form.store, flushes)
    flushes.add(flush)
    return () => {
      flushes.delete(flush)
    }
  }, [form, flush])
}

// Lets a second click during the upload wait reuse the first submit
const submitting = new WeakMap<AnyFormApi["store"], Promise<void>>()

/**
 * Flushes pending field values and waits for uploads, then submits. Use this in place of
 * `form.handleSubmit()`, as Enter or a shortcut submits without blurring the field first.
 */
export const submitForm = (form: AnyFormApi) => {
  const current = submitting.get(form.store)
  if (current) return current
  const submit = (async () => {
    await Promise.all(Array.from(pending.get(form.store) ?? [], (flush) => flush()))
    await form.handleSubmit()
  })().finally(() => submitting.delete(form.store))
  submitting.set(form.store, submit)
  return submit
}
