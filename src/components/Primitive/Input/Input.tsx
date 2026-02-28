import { forwardRef, useId } from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string
  error: string | undefined
  containerClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, containerClassName, className, required, ...props }, ref) => {
    const id = useId()
    return (
      <div className={cn("flex w-full flex-col justify-start gap-1 font-mono", containerClassName)}>
        <label className="block font-medium text-gray-700 text-sm" htmlFor={id}>
          {label}
          {required && <span className="ml-1 text-brand-pink">*</span>}
        </label>
        <input
          className={cn("w-full rounded border border-gray-300 px-3 py-2", className)}
          id={id}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-red-600 text-sm">{error}</p>}
      </div>
    )
  },
)
