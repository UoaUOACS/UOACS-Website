"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/Primitive"
import { PinInput } from "@/components/Primitive/PinInput/PinInput"
import { ApiRoutes, Routes } from "@/lib/routes"
import { toast } from "@/lib/toast"
import { useSignUpFormStore } from "./stores/SignUpForm.store"

const otpSchema = z.object({
  code: z.string().length(6, "Please enter a 6-digit code").regex(/^\d+$/, "Code must be numeric"),
})

type OtpForm = z.infer<typeof otpSchema>

const RESEND_COOLDOWN_S = 60

export const EmailVerificationStep = () => {
  const { step1, prevStep, nextStep, reset } = useSignUpFormStore()
  const [submitting, setSubmitting] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_S)
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpForm>({ resolver: zodResolver(otpSchema) })

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

  const sendOtp = async () => {
    if (!step1) return
    setResendCooldown(RESEND_COOLDOWN_S)
    try {
      const response = await fetch(ApiRoutes.SIGN_UP.SEND_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: step1.email }),
      })
      if (!response.ok) {
        setResendCooldown(0)
        if (response.status === 429) {
          toast.warning({ description: "Please wait before requesting another code." })
        } else {
          toast.error({ description: "Failed to send verification email. Please try again." })
        }
        return
      }
      startCooldown()
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

  const onSubmit = async ({ code }: OtpForm) => {
    if (!step1) {
      toast.error({ description: "Something went wrong. Please start over." })
      reset()
      return
    }

    setSubmitting(true)
    try {
      const verifyResponse = await fetch(ApiRoutes.SIGN_UP.VERIFY_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: step1.email, code }),
      })

      if (!verifyResponse.ok) {
        const body = await verifyResponse.json()
        if (body?.error === "expired") {
          toast.warning({ description: "Your code has expired. Please request a new one." })
        } else {
          toast.warning({ description: "Incorrect code. Please check your email and try again." })
        }
        return
      }

      const { memberExists } = await verifyResponse.json()

      if (memberExists) {
        router.prefetch(Routes.LOGIN)
        const signUpResponse = await fetch(ApiRoutes.SIGN_UP.ROOT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...step1, existingMember: true }),
        })

        if (!signUpResponse.ok) {
          if (signUpResponse.status === 409) {
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
        router.push(Routes.LOGIN)
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
          className="paragraph-sm text-gray-500 underline disabled:cursor-not-allowed disabled:opacity-50"
          disabled={resendCooldown > 0}
          onClick={sendOtp}
          type="button"
        >
          {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code"}
        </button>
      </form>
    </>
  )
}
