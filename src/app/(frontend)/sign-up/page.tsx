import { SignUpForm } from "@/components/Composite"
import { Heading } from "@/components/Primitive"

export default function SignUpPage() {
  return (
    <div className="flex w-full flex-col justify-center gap-8 px-4">
      <Heading className="justify-start" h={3}>
        Sign Up
      </Heading>
      <SignUpForm />
    </div>
  )
}
