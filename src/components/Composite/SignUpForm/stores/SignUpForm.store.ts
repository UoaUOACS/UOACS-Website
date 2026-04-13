import { create } from "zustand"
import type { CreateMemberInput } from "@/types/schemas/member"
import type { CreateUserInput } from "@/types/schemas/user"

type Step1Data = CreateUserInput
type Step2Data = Omit<CreateMemberInput, "firstName" | "lastName" | "email">

export interface SignUpFormStore {
  step1: Step1Data | null
  step2: Step2Data | null
  currentStep: number
  setStep1: (data: Step1Data) => void
  setStep2: (data: Step2Data) => void
  nextStep: () => void
  prevStep: () => void
  reset: () => void
}

export const useSignUpFormStore = create<SignUpFormStore>((set) => ({
  step1: null,
  step2: null,
  currentStep: 0,
  setStep1: (data) => set({ step1: data }),
  setStep2: (data) => set({ step2: data }),
  nextStep: () => set((s) => ({ currentStep: s.currentStep + 1 })),
  prevStep: () => set((s) => ({ currentStep: s.currentStep - 1 })),
  reset: () => set({ step1: null, step2: null, currentStep: 0 }),
}))
