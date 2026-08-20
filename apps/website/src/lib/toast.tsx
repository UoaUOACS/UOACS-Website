"use client"

import { Toast, type ToastProps } from "@uoacs/ui"
import { toast as sonnerToast } from "sonner"

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
