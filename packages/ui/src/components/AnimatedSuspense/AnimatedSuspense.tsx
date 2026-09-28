import { Suspense, ViewTransition } from "react"

/**
 * Props for the {@link AnimatedSuspense} component
 */
export interface AnimatedSuspenseProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * A `Suspense` boundary that fades the fallback out and the content in with a view transition.
 * Browsers without the View Transitions API swap the two with no animation.
 *
 * @param children The content that can suspend.
 * @param fallback The content to show while `children` loads, e.g. a `Skeleton`.
 * @returns A Suspense boundary with animated enter and exit.
 */
export const AnimatedSuspense = ({ children, fallback }: AnimatedSuspenseProps) => (
  <Suspense
    fallback={
      <ViewTransition default="none" exit="auto">
        {fallback}
      </ViewTransition>
    }
  >
    <ViewTransition default="none" enter="auto">
      {children}
    </ViewTransition>
  </Suspense>
)
