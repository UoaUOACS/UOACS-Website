"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/Primitive"
import { Input } from "@/components/Primitive/Input/Input"
import { authClient } from "@/lib/auth-client"
import { Routes } from "@/lib/routes"
import { toast } from "@/lib/toast"
import { type LoginInput, type LoginOutput, loginSchema } from "@/types/schemas/login"

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput, unknown, LoginOutput>({
    resolver: zodResolver(loginSchema),
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: LoginOutput) => {
    router.prefetch(Routes.HOME)
    setLoading(true)
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
        } else {
          toast.error({
            description: "An error occurred while logging in",
          })
        }
        return
      }

      router.push(Routes.HOME)
      toast.success({
        description: "Successfully logged in!",
      })
    } catch {
      toast.error({
        description: "An error occurred while logging in",
      })
    } finally {
      setLoading(false)
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

      <p className="paragraph-xs text-gray-500">
        Don&apos;t have an account?{" "}
        <Link className="underline transition-colors hover:text-gray-700" href={Routes.SIGN_UP}>
          Sign Up
        </Link>
      </p>
    </form>
  )
}
