"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, PinInput } from "@uoacs/ui"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { ApiError, api } from "@/lib/api/api-client"
import { authClient } from "@/lib/auth/auth-client"
import { ApiRoutes, Routes } from "@/lib/routes"
import { toast } from "@/lib/toast"
import {
  type EmailVerificationCodeForm,
  emailVerificationCodeFormSchema,
} from "@/types/schemas/verification-code"
import { useSignUpFormStore } from "./stores/SignUpForm.store"

const RESEND_COOLDOWN_S = 60

export const EmailVerificationStep = () => {
  const { step1, prevStep, nextStep, reset } = useSignUpFormStore()
  const [submitting, setSubmitting] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_S)
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const router = useRouter()
  const { refetch: refetchSession } = authClient.useSession()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerificationCodeForm>({ resolver: zodResolver(emailVerificationCodeFormSchema) })

  const startCooldown = () => {
    if (cooldownRef.current) clearInterval(cooldownRef.current)
    setResendCooldown(RESEND_COOLDOWN_S)
    const id = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(id)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    cooldownRef.current = id
  }

  const sendVerificationCode = async () => {
    if (!step1) return
    setResendCooldown(RESEND_COOLDOWN_S)
    try {
      await api.post(
        ApiRoutes.SIGN_UP.VERIFICATION_CODE,
        { email: step1.email },
        { toastOnError: false },
      )
      startCooldown()
      toast.success({ description: "Verification email sent! Please check your inbox." })
    } catch (err) {
      setResendCooldown(0)
      if (err instanceof ApiError && err.status === 429) {
        toast.warning({ description: "Please wait before requesting another code." })
      } else {
        toast.error({ description: "Failed to send verification email. Please try again." })
      }
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(id)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    cooldownRef.current = id
    return () => clearInterval(id)
  }, [])

  const onSubmit = async ({ code }: EmailVerificationCodeForm) => {
    if (!step1) {
      toast.error({ description: "Something went wrong. Please start over." })
      reset()
      return
    }

    setSubmitting(true)
    try {
      let verifyResult: { memberExists: boolean }
      try {
        verifyResult = await api.put<{ memberExists: boolean }>(
          ApiRoutes.SIGN_UP.VERIFICATION_CODE,
          { email: step1.email, code },
          { toastOnError: false },
        )
      } catch (err) {
        if (err instanceof ApiError && err.message === "expired") {
          toast.warning({ description: "Your code has expired. Please request a new one." })
        } else {
          toast.warning({ description: "Incorrect code. Please check your email and try again." })
        }
        return
      }

      const { memberExists } = verifyResult

      if (memberExists) {
        try {
          await api.post(
            ApiRoutes.SIGN_UP.ROOT,
            { ...step1, existingMember: true },
            { toastOnError: false },
          )
        } catch (err) {
          if (err instanceof ApiError && err.status === 409) {
            toast.warning({
              description:
                "This email is already in use.\nIf you think this is a mistake, please contact us at admin@uoacs.co.nz",
            })
          } else {
            toast.error({ description: "An error occurred while submitting the form" })
          }
          return
        }

        reset()
        const { data: session, error } = await authClient.getSession()
        if (!session || error) {
          console.error("Session confirmation failed after sign-up", error)
          toast.error({
            description: "Signed up, but we couldn't confirm your session. Please log in.",
          })
          router.push(Routes.LOGIN)
          return
        }

        await refetchSession()
        router.push(Routes.PROFILE)
        toast.success({
          description: "Successfully signed up!\nWe look forward to seeing you at our events!!",
        })
      } else {
        nextStep()
      }
    } catch {
      toast.error({ description: "An error occurred. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <p className="paragraph-md -mt-4 mb-4 text-gray-500">
        We sent a 6-digit verification code to{" "}
        <span className="font-medium text-gray-700">{step1?.email}</span>. Enter it below to
        continue.
      </p>
      <form
        className="flex w-full flex-col items-start justify-center gap-4"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <PinInput
              error={errors.code?.message}
              label="Verification Code"
              onChange={field.onChange}
              required
              value={field.value ?? ""}
            />
          )}
        />

        <div className="flex w-full gap-2">
          <Button onClick={prevStep} theme="light" type="button">
            Back
          </Button>
          <Button disabled={submitting} theme="dark" type="submit">
            {submitting ? "Verifying..." : "Verify"}
          </Button>
        </div>

        <button
          className="paragraph-sm cursor-pointer text-gray-500 underline disabled:cursor-not-allowed disabled:opacity-50"
          disabled={resendCooldown > 0}
          onClick={sendVerificationCode}
          type="button"
        >
          {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code"}
        </button>
      </form>
    </>
  )
}
