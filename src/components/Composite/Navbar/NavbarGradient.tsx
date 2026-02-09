import { cn } from "@/lib/utils"

/**
 *
 */
export const NavbarGradient = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "absolute -top-20 left-1/2 -z-1 h-40 w-full -translate-x-1/2 rounded-[50%] bg-[linear-gradient(#8A40E7_0%,#C861A7_41%,#F27F76_67%,#FF9961_100%)] opacity-50 blur-3xl md:-top-40 md:h-80",
        className,
      )}
      {...props}
    />
  )
}
