import { create } from "zustand"
import type { CreateMemberInput } from "@/types/schemas/member"
import type { CreateUserInput } from "@/types/schemas/user"

type Step1Data = CreateUserInput
type Step2Data = Omit<CreateMemberInput, "firstName" | "lastName" | "email">

export const SIGN_UP_STEPS = {
  USER: 0,
  EMAIL_VERIFICATION: 1,
  MEMBER: 2,
} as const
export type SignUpStep = (typeof SIGN_UP_STEPS)[keyof typeof SIGN_UP_STEPS]

export interface SignUpFormStore {
  step1: Step1Data | null
  step2: Step2Data | null
  currentStep: SignUpStep
  setStep1: (data: Step1Data) => void
  setStep2: (data: Step2Data) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
}

const pageTransitions: Record<SignUpStep, { prev: SignUpStep; next: SignUpStep }> = {
  [SIGN_UP_STEPS.USER]: {
    prev: SIGN_UP_STEPS.USER,
    next: SIGN_UP_STEPS.EMAIL_VERIFICATION,
  },
  [SIGN_UP_STEPS.EMAIL_VERIFICATION]: {
    prev: SIGN_UP_STEPS.USER,
    next: SIGN_UP_STEPS.MEMBER,
  },
  [SIGN_UP_STEPS.MEMBER]: {
    prev: SIGN_UP_STEPS.USER,
    next: SIGN_UP_STEPS.MEMBER,
  },
}

const defaultValues: Pick<SignUpFormStore, "step1" | "step2" | "currentStep"> = {
  step1: null,
  step2: null,
  currentStep: SIGN_UP_STEPS.USER,
}

export const useSignUpFormStore = create<SignUpFormStore>((set) => ({
  ...defaultValues,
  currentStep: SIGN_UP_STEPS.USER,
  setStep1: (data) => set({ step1: data }),
  setStep2: (data) => set({ step2: data }),
  nextStep: () => set((s) => ({ currentStep: pageTransitions[s.currentStep].next })),
  prevStep: () => set((s) => ({ currentStep: pageTransitions[s.currentStep].prev })),
  reset: () => set(defaultValues),
}))
