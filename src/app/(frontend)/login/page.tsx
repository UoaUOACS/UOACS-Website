import { LoginForm } from "@/components/Composite"
import { Heading } from "@/components/Primitive"
import { GuestOnly } from "../_components/GuestOnly"

export default function LoginPage() {
  return (
    <GuestOnly>
      <div className="flex w-full flex-col justify-center gap-8 px-4">
        <Heading className="justify-start" h={3}>
          Log In
        </Heading>
        <LoginForm />
      </div>
    </GuestOnly>
  )
}
