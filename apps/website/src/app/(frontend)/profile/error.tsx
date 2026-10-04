"use client"

import { Button, Heading } from "@uoacs/ui"

export default function ProfileError({ retry }: { retry: () => void }) {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="flex max-w-64 flex-col items-center justify-center gap-6 text-center">
        <div>
          <Heading h={3}>Couldn't confirm your session</Heading>
          <p className="paragraph">We could not reach the login service. Try again in a moment.</p>
        </div>
        <Button onClick={retry} theme="dark">
          Try Again
        </Button>
      </div>
    </div>
  )
}
