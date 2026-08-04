"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/Primitive"
import { Input } from "@/components/Primitive/Input/Input"
import { authClient } from "@/lib/auth/auth-client"
import { Routes } from "@/lib/routes"
import { toast } from "@/lib/toast"
import {
  type ForgotPasswordInput,
  type ForgotPasswordOutput,
  forgotPasswordSchema,
} from "@/types/schemas/forgot-password"

export const ForgotPasswordForm = () => {
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
      const { error: resetRequestError } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: Routes.RESET_PASSWORD,
      })

      if (resetRequestError) {
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
