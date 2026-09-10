import { cn } from "../../utils"
import { type TabVariantProps, tabVariants } from "./Tab.variants"

/**
 * Props for the {@link Tab} component.
 */
export interface TabProps extends TabVariantProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: React.Ref<HTMLButtonElement>
}

/**
 * A single folder-shaped tab button. Purely presentational — it forwards
 * `aria-selected`/`id`/`aria-controls`/`tabIndex`/`onClick`/`ref` as given, so a
 * parent tablist owns the accessibility contract and keyboard navigation.
 *
 * The trapezoid fill and label are separate layers so the clip-path never touches
 * the button's own border-box: the focus ring (on the button itself) stays a full,
 * uncut rectangle, and the label text is never subject to the clip-path either.
 */
export const Tab = ({ children, className, active, ref, ...props }: TabProps) => {
  const { root, fill, label } = tabVariants({ active })

  return (
    <button className={cn(root(), className)} ref={ref} type="button" {...props}>
      <span aria-hidden="true" className={fill()} />
      <span className={label()}>{children}</span>
    </button>
  )
}
