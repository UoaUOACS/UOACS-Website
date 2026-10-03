"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AuthPages } from "@uoacs/shared"
import { authClient } from "@uoacs/shared/auth"
import { Button, PinInput } from "@uoacs/ui"
import { toast } from "@uoacs/ui/toast"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { sendVerificationCode, signUp, verifyCode } from "@/actions/sign-up"
import { withRedirect } from "@/lib/redirect"
import {
  type EmailVerificationCodeForm,
  emailVerificationCodeFormSchema,
} from "@/types/schemas/verification-code"
import type { SignUpStepProps } from "./SignUpForm"
import { useSignUpFormStore } from "./stores/SignUpForm.store"

const RESEND_COOLDOWN_S = 60

export const EmailVerificationStep = ({ redirect, returnTo }: SignUpStepProps) => {
  const { step1, prevStep, nextStep, reset } = useSignUpFormStore()
  const [submitting, setSubmitting] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_S)
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const router = useRouter()

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

  const resendVerificationCode = async () => {
    if (!step1) return
    setResendCooldown(RESEND_COOLDOWN_S)
    try {
      const result = await sendVerificationCode(step1.email)
      if (!result.ok) {
        setResendCooldown(0)
        if (result.error === "cooldown") {
          toast.warning({ description: "Please wait before requesting another code." })
        } else {
          toast.error({ description: "Failed to send verification email. Please try again." })
        }
        return
      }
      startCooldown()
      toast.success({ description: "Verification email sent! Please check your inbox." })
    } catch {
      setResendCooldown(0)
      toast.error({ description: "Failed to send verification email. Please try again." })
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
      const verifyResult = await verifyCode(step1.email, code)
      if (!verifyResult.ok) {
        if (verifyResult.error === "expired") {
          toast.warning({ description: "Your code has expired. Please request a new one." })
        } else {
          toast.warning({ description: "Incorrect code. Please check your email and try again." })
        }
        return
      }

      if (verifyResult.memberExists) {
        const signUpResult = await signUp({ ...step1, existingMember: true })
        if (!signUpResult.ok) {
          if (signUpResult.error === "duplicate") {
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
          router.push(withRedirect(AuthPages.LOGIN, redirect))
          return
        }

        window.location.assign(returnTo)
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
          onClick={resendVerificationCode}
          type="button"
        >
          {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code"}
        </button>
      </form>
    </>
  )
}
