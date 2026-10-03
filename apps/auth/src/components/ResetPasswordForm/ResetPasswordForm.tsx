"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AuthPages } from "@uoacs/shared"
import { authClient } from "@uoacs/shared/auth"
import { Button, Input } from "@uoacs/ui"
import { toast } from "@uoacs/ui/toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { withRedirect } from "@/lib/redirect"
import {
  type ResetPasswordInput,
  type ResetPasswordOutput,
  resetPasswordSchema,
} from "@/types/schemas/reset-password"

type ResetPasswordFormProps = {
  token: string | null
  error: string | null
  redirect: string | null
}

export const ResetPasswordForm = ({ token, error, redirect }: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput, unknown, ResetPasswordOutput>({
    resolver: zodResolver(resetPasswordSchema),
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: ResetPasswordOutput) => {
    if (!token) return

    setLoading(true)
    try {
      const { error: resetError } = await authClient.resetPassword({
        newPassword: data.password,
        token,
      })

      if (resetError) {
        if (resetError.code === "INVALID_TOKEN") {
          toast.error({
            description: "This reset link is invalid or has expired. Please request a new one.",
          })
        } else if (resetError.status === 429) {
          toast.error({
            description: "Too many attempts. Please wait a moment and try again.",
          })
        } else {
          console.error("[ResetPasswordForm] Reset password failed", { error: resetError })
          toast.error({
            description: "An error occurred while resetting your password",
          })
        }
        return
      }

      router.push(withRedirect(AuthPages.LOGIN, redirect))
      toast.success({
        description: "Your password has been reset. You can now log in.",
      })
    } catch (error) {
      console.error("[ResetPasswordForm] Failed to reset password", { error })
      toast.error({
        description: "An error occurred while resetting your password",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!token || error === "INVALID_TOKEN") {
    return (
      <p className="paragraph-md text-gray-500">
        This reset link is invalid or has expired. Please{" "}
        <Link
          className="underline transition-colors hover:text-gray-700"
          href={withRedirect(AuthPages.FORGOT_PASSWORD, redirect)}
        >
          request a new one
        </Link>
        .
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
        {...register("password")}
        error={errors.password?.message}
        label="New Password"
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

      <Button disabled={loading} theme="dark" type="submit">
        {loading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  )
}
