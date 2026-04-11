import Link from "next/link"
import { SignUpForm } from "@/components/Composite"
import { Heading } from "@/components/Primitive"
import { Routes } from "@/lib/routes"

export default function SignUpPage() {
  return (
    <div className="flex w-full flex-col justify-center gap-8 px-4">
      <Heading className="justify-start" h={3}>
        Sign Up
      </Heading>
      <div className="flex w-full flex-col justify-center gap-4">
        <SignUpForm />
        <p className="paragraph-xs text-gray-500">
          Already Signed Up?{" "}
          <Link className="underline transition-colors hover:text-gray-700" href={Routes.LOGIN}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}
