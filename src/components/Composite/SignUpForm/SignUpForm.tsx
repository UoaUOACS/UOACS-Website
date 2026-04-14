"use client"

import { EmailVerificationStep } from "./EmailVerificationStep"
import { MemberStep } from "./MemberStep"
import { SIGN_UP_STEPS, type SignUpStep, useSignUpFormStore } from "./stores/SignUpForm.store"
import { UserStep } from "./UserStep"

export const SignUpForm = () => {
  const { currentStep } = useSignUpFormStore()
  const STEPS: Record<SignUpStep, React.ComponentType> = {
    [SIGN_UP_STEPS.USER]: UserStep,
    [SIGN_UP_STEPS.EMAIL_VERIFICATION]: EmailVerificationStep,
    [SIGN_UP_STEPS.MEMBER]: MemberStep,
  }
  const CurrentStep = STEPS[currentStep]

  return <CurrentStep />
}
