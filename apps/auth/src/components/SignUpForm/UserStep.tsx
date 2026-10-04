"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@uoacs/ui"
import { toast } from "@uoacs/ui/toast"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { sendVerificationCode } from "@/actions/sign-up"
import { createUserSchema } from "@/types/schemas/user"
import { useSignUpFormStore } from "./stores/SignUpForm.store"

type FormInput = z.input<typeof createUserSchema>
type FormOutput = z.output<typeof createUserSchema>

export const UserStep = () => {
  const { step1, setStep1, nextStep } = useSignUpFormStore()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(createUserSchema),
  })

  useEffect(() => {
    if (step1) resetForm(step1)
  }, [step1, resetForm])

  const onSubmit = async (data: FormOutput) => {
    const { confirmPassword: _, ...userData } = data
    setSubmitting(true)
    try {
      setStep1(userData)
      const result = await sendVerificationCode(userData.email)
      if (!result.ok) {
        if (result.error === "cooldown") {
          toast.warning({ description: "We sent you a code recently. Check your inbox." })
          nextStep()
        } else if (result.error === "invalid") {
          toast.warning({ description: "Please check your email address." })
        } else {
          toast.error({ description: "Failed to send verification email. Please try again." })
        }
        return
      }
      nextStep()
    } catch (error) {
      console.error("[UserStep] Sending verification code threw", { error })
      toast.error({
        description:
          "Failed to send verification email. Please try again. If this keeps happening, refresh the page.",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <p className="paragraph-md -mt-4 mb-4 text-gray-500">
        If you have already signed up as a member, go ahead and add a password to finish creating
        your UOACS account.
        <br />
        If you haven&apos;t signed up as a member before, no worries! Just fill out this form and we
        will create a membership for you.
      </p>
      <form
        className="flex w-full flex-col items-start justify-center gap-4"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="item-center flex w-full flex-col justify-start gap-2 md:flex-row md:gap-4">
          <Input
            {...register("firstName")}
            error={errors.firstName?.message}
            label="First Name"
            required
            type="text"
          />
          <Input
            {...register("lastName")}
            error={errors.lastName?.message}
            label="Last Name"
            required
            type="text"
          />
        </div>

        <Input
          {...register("email")}
          error={errors.email?.message}
          label="Email"
          required
          type="email"
        />

        <Input
          {...register("password")}
          error={errors.password?.message}
          label="Password"
          required
          type="password"
        />

        <Input
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          label="Confirm Password"
          required
          type="password"
        />

        <Button disabled={submitting} theme="dark" type="submit">
          {submitting ? "Sending..." : "Next"}
        </Button>
      </form>
    </>
  )
}
