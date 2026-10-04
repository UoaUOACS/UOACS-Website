"use client"

import type { SafeRedirectUrl } from "@/lib/redirect"
import { EmailVerificationStep } from "./EmailVerificationStep"
import { MemberStep } from "./MemberStep"
import { SIGN_UP_STEPS, type SignUpStep, useSignUpFormStore } from "./stores/SignUpForm.store"
import { UserStep } from "./UserStep"

export type SignUpStepProps = {
  redirect: string | null
  returnTo: SafeRedirectUrl
}

export const SignUpForm = ({ redirect, returnTo }: SignUpStepProps) => {
  const { currentStep } = useSignUpFormStore()
  const STEPS: Record<SignUpStep, React.ComponentType<SignUpStepProps>> = {
    [SIGN_UP_STEPS.USER]: UserStep,
    [SIGN_UP_STEPS.EMAIL_VERIFICATION]: EmailVerificationStep,
    [SIGN_UP_STEPS.MEMBER]: MemberStep,
  }
  const CurrentStep = STEPS[currentStep]

  return <CurrentStep redirect={redirect} returnTo={returnTo} />
}
