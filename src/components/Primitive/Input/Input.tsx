"use client"

import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentPropsWithRef<"input"> {
  label?: string
  error?: string
  containerClassName?: string
}

export const Input = ({
  label,
  error,
  containerClassName,
  className,
  required,
  ref,
  ...props
}: InputProps) => {
  if (!label) {
    return (
      <input
        className={cn("w-full rounded border border-gray-300 px-3 py-2", className)}
        ref={ref}
        {...props}
      />
    )
  }

  return (
    <div className={cn("flex w-full flex-col justify-start gap-2 font-mono", containerClassName)}>
      <label className="block font-medium text-gray-700 text-sm" htmlFor={label}>
        {label}
        {required && <span className="ml-1 text-brand-pink">*</span>}
      </label>
      <input
        className={cn("w-full rounded border border-gray-300 px-3 py-2", className)}
        id={label}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
    </div>
  )
}
