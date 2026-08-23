"use client"

import { toast as sonnerToast } from "sonner"
import { Toast, type ToastProps } from "../components/Toast/Toast"

// Re-exported so consumers get the renderer and the API from one place: calling
// toast() does nothing unless <Toaster /> is mounted, and sonner stays an
// implementation detail of this package.
export { Toaster } from "sonner"

export const toast = {
  success: (toast: Omit<ToastProps, "type">) => {
    sonnerToast.custom((_id) => <Toast description={toast.description} type="success" />)
  },
  warning: (toast: Omit<ToastProps, "type">) => {
    sonnerToast.custom((_id) => <Toast description={toast.description} type="warning" />)
  },
  error: (toast: Omit<ToastProps, "type">) => {
    sonnerToast.custom((_id) => <Toast description={toast.description} type="error" />)
  },
}
