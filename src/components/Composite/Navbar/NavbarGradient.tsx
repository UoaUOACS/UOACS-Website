import { cn } from "@/lib/utils"

/**
 *
 */
export const NavbarGradient = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "-top-20 md:-top-40 -z-1 -translate-x-1/2 absolute left-1/2 h-40 w-full rounded-[50%] bg-[linear-gradient(#8A40E7_0%,#C861A7_41%,#F27F76_67%,#FF9961_100%)] opacity-50 blur-3xl md:h-80",
        className,
      )}
      {...props}
    />
  )
}
