"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { checkMemberExists } from "@/actions/member.actions"
import { Button } from "@/components/Primitive"
import { Input } from "@/components/Primitive/Input/Input"
import { ApiRoutes, Routes } from "@/lib/routes"
import { toast } from "@/lib/toast"
import { createUserSchema } from "@/types/schemas/user"
import { useSignUpFormStore } from "./stores/SignUpForm.store"

type FormInput = z.input<typeof createUserSchema>
type FormOutput = z.output<typeof createUserSchema>

export const UserStep = () => {
  const { setStep1, nextStep } = useSignUpFormStore()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(createUserSchema),
  })

  const onSubmit = async (data: FormOutput) => {
    setLoading(true)
    try {
      const memberExists = await checkMemberExists(data.email)

      if (!memberExists) {
        setStep1(data)
        nextStep()
        return
      }

      router.prefetch(Routes.HOME)
      const response = await fetch(ApiRoutes.SIGN_UP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, existingMember: true }),
      })

      if (!response.ok) {
        if (response.status === 409) {
          toast.warning({
            description:
              "This email is already in use.\nIf you think this is a mistake, please contact us at admin@uoacs.co.nz",
          })
        } else {
          toast.error({ description: "An error occurred while submitting the form" })
        }
        return
      }

      router.push(Routes.HOME)
      toast.success({
        description: "Successfully signed up!\nWe look forward to seeing you at our events!!",
      })
    } catch {
      toast.error({ description: "An error occurred while submitting the form" })
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

      <Button disabled={loading} theme="dark" type="submit">
        {loading ? "Loading..." : "Next"}
      </Button>
    </form>
  )
}
