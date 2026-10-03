"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AuthPages } from "@uoacs/shared"
import { authClient } from "@uoacs/shared/auth"
import { Button, Input } from "@uoacs/ui"
import { toast } from "@uoacs/ui/toast"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { type SafeRedirectUrl, withRedirect } from "@/lib/redirect"
import { type LoginInput, type LoginOutput, loginSchema } from "@/types/schemas/login"

type LoginFormProps = {
  redirect: string | null
  returnTo: SafeRedirectUrl
}

export const LoginForm = ({ redirect, returnTo }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput, unknown, LoginOutput>({
    resolver: zodResolver(loginSchema),
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: LoginOutput) => {
    setLoading(true)
    let leaving = false
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      })

      if (error) {
        if (error.code === "INVALID_EMAIL_OR_PASSWORD") {
          toast.error({
            description: "Incorrect email or password",
          })
        } else if (error.status === 429) {
          toast.error({
            description: "Too many attempts. Please wait a moment and try again.",
          })
        } else {
          console.error("[LoginForm] Log in failed", { error })
          toast.error({
            description: "An error occurred while logging in",
          })
        }
        return
      }

      const { data: session, error: sessionError } = await authClient.getSession()
      if (!session || sessionError) {
        console.error("Session confirmation failed after log in", sessionError)
        toast.error({
          description: "Logged in, but we couldn't confirm your session. Please try again.",
        })
        return
      }

      leaving = true
      window.location.assign(returnTo)
    } catch (error) {
      console.error("[LoginForm] Log in threw", { error })
      toast.error({
        description:
          "An error occurred while logging in. If this keeps happening, refresh the page.",
      })
    } finally {
      if (!leaving) setLoading(false)
    }
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

      <Input
        {...register("password")}
        error={errors.password?.message}
        label="Password"
        required
        type="password"
      />

      <Button disabled={loading} theme="dark" type="submit">
        {loading ? "Logging in..." : "Log In"}
      </Button>

      <div className="paragraph-xs flex w-full flex-col gap-4 text-gray-500 md:flex-row md:justify-between">
        <p>
          Don&apos;t have an account?{" "}
          <Link
            className="underline transition-colors hover:text-gray-700"
            href={withRedirect(AuthPages.SIGN_UP, redirect)}
          >
            Sign Up
          </Link>
        </p>
        <Link
          className="text-left underline transition-colors hover:text-gray-700 md:text-right"
          href={withRedirect(AuthPages.FORGOT_PASSWORD, redirect)}
        >
          Forgot Password?
        </Link>
      </div>
    </form>
  )
}
