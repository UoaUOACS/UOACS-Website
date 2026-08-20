import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { cn } from "@/lib/utils"

export interface ToastProps {
  type: "success" | "warning" | "error"
  description: string
}

const config = {
  success: {
    Icon: CheckCircleIcon,
    iconClass: "text-green-500",
    borderClass: "border-l-green-500",
    bgClass: "bg-green-50",
  },
  warning: {
    Icon: ExclamationTriangleIcon,
    iconClass: "text-brand-orange",
    borderClass: "border-l-brand-orange",
    bgClass: "bg-orange-50",
  },
  error: {
    Icon: XCircleIcon,
    iconClass: "text-primary",
    borderClass: "border-l-primary",
    bgClass: "bg-pink-50",
  },
} as const

export const Toast = ({ type, description }: ToastProps) => {
  const { Icon, iconClass, borderClass, bgClass } = config[type]
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center gap-3 rounded-lg border-l-4 p-4 shadow-md md:max-w-md",
        borderClass,
        bgClass,
      )}
    >
      <Icon className={cn("size-6 shrink-0", iconClass)} />
      <p className="paragraph-sm text-gray-700">{description}</p>
    </div>
  )
}
