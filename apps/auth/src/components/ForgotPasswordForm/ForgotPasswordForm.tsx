"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPasswordSchema } from "@uoacs/shared"
import { Button, Input } from "@uoacs/ui"
import { toast } from "@uoacs/ui/toast"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { forgotPassword } from "@/actions/forgot-password"

type ForgotPasswordInput = z.input<typeof forgotPasswordSchema>
type ForgotPasswordOutput = z.output<typeof forgotPasswordSchema>

type ForgotPasswordFormProps = {
  redirect: string | null
}

export const ForgotPasswordForm = ({ redirect }: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput, unknown, ForgotPasswordOutput>({
    resolver: zodResolver(forgotPasswordSchema),
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = async (data: ForgotPasswordOutput) => {
    setLoading(true)
    try {
      const result = await forgotPassword(data.email, redirect)
      if (!result.ok) {
        console.error("[ForgotPasswordForm] Failed to request password reset", {
          error: result.error,
        })
        toast.error({
          description: "An error occurred while requesting a password reset",
        })
        return
      }
      setSubmitted(true)
    } catch (error) {
      console.error("[ForgotPasswordForm] Failed to request password reset", { error })
      toast.error({
        description: "An error occurred while requesting a password reset",
      })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <p className="paragraph-md text-gray-500">
        If an account exists for that email, we&apos;ve sent a link to reset your password.
      </p>
    )
  }

  return (
    <form
      className="flex w-full flex-col items-start justify-center gap-4"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("email")}
        error={errors.email?.message}
        label="Email"
        required
        type="email"
      />

      <Button disabled={loading} theme="dark" type="submit">
        {loading ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  )
}
