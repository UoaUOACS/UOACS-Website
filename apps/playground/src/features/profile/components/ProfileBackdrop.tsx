import { cn } from "@uoacs/ui/utils"

/**
 * The peach-to-pink wash behind the top of the profile page.
 *
 * Absolutely positioned and decorative, so it needs a positioned ancestor and
 * is hidden from assistive tech. Kept out of the page components themselves so
 * they stay backdrop-agnostic in Storybook and in-app.
 *
 * It sits at `z-0` rather than behind the page, because a negative z-index
 * would put it under the ancestor's own background. Give the content beside it
 * a positioned class such as `relative z-10` so it stays on top.
 *
 * @param className Additional class names, e.g. to change the height.
 * @param props Other div attributes.
 * @returns The decorative gradient backdrop.
 * @example
 * <main className="relative">
 *   <ProfileBackdrop />
 *   <div className="relative z-10">{content}</div>
 * </main>
 */
export const ProfileBackdrop = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-0 h-[26rem] overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-[radial-gradient(85%_95%_at_50%_0%,var(--color-orange-200)_0%,var(--color-orange-50)_48%,transparent_80%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-pink-300)_0%,transparent_32%,transparent_68%,var(--color-pink-300)_100%)] opacity-35 blur-3xl" />
    </div>
  )
}
