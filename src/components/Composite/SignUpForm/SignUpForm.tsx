"use client"

import { MemberStep } from "./MemberStep"
import { useSignUpFormStore } from "./stores/SignUpForm.store"
import { UserStep } from "./UserStep"

export const SignUpForm = () => {
  const { currentStep } = useSignUpFormStore()
  const STEPS = [UserStep, MemberStep]
  const CurrentStep = STEPS[currentStep]

  return <CurrentStep />
}
