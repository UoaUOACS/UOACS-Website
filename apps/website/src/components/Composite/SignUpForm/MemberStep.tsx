"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, MultiSelect, Radio, Select } from "@uoacs/ui"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import type { z as zType } from "zod"
import { z } from "zod"

import { ApiError, api } from "@/lib/api/api-client"
import { authClient } from "@/lib/auth/auth-client"
import { ApiRoutes, Routes } from "@/lib/routes"
import { toast } from "@/lib/toast"
import { memberSchema } from "@/types/schemas/member"
import { useSignUpFormStore } from "./stores/SignUpForm.store"

const step2Schema = memberSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    firstName: true,
    lastName: true,
    email: true,
  })
  .superRefine((data, ctx) => {
    if (!data.compsciStudent && (!data.otherMajors || data.otherMajors.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter your major(s)",
        path: ["otherMajors"],
      })
    }
  })

type FormInput = zType.input<typeof step2Schema>
type FormOutput = zType.output<typeof step2Schema>

export const MemberStep = () => {
  const { step1, step2, setStep2, prevStep, reset } = useSignUpFormStore()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { refetch: refetchSession } = authClient.useSession()

  const {
    control,
    register,
    handleSubmit,
    watch,
    getValues,
    reset: resetForm,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(step2Schema),
  })

  useEffect(() => {
    if (step2) resetForm(step2)
  }, [step2, resetForm])

  const isCompsciStudent = watch("compsciStudent")

  const onSubmit = async (step2Data: FormOutput) => {
    if (!step1) {
      toast.error({ description: "Something went wrong. Please start over." })
      reset()
      return
    }
    setStep2(step2Data)
    setLoading(true)
    try {
      await api.post(ApiRoutes.SIGN_UP.ROOT, { ...step1, ...step2Data }, { toastOnError: false })
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
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        toast.warning({
          description:
            "This email is already in use.\nIf you think this is a mistake, please contact us at admin@uoacs.co.nz",
        })
      } else {
        toast.error({ description: "An error occurred while submitting the form" })
      }
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
          {...register("upi")}
          error={errors.upi?.message}
          hint="Not a UOA student? Enter N/A"
          label="UPI"
          required
          type="text"
        />
        <Input
          {...register("uoaID")}
          error={errors.uoaID?.message}
          hint="Not a UOA student? Enter N/A"
          label="UOA ID Number"
          required
          type="text"
        />
      </div>

      <div className="item-center flex w-full flex-col justify-start gap-2 md:flex-row md:gap-4">
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select
              error={errors.gender?.message}
              label="Gender"
              onChange={field.onChange}
              options={["Male", "Female", "Other", "Prefer not to say"]}
              ref={field.ref}
              required
              value={field.value ?? ""}
            />
          )}
        />

        <Input
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
          label="Phone Number"
          type="text"
        />
      </div>

      <Controller
        control={control}
        name="compsciStudent"
        render={({ field }) => (
          <Radio
            error={errors.compsciStudent?.message}
            label="Are you a computer science student?"
            onChange={(value) => field.onChange(value === "Yes")}
            options={["Yes", "No"]}
            optionsClassName="flex-row"
            ref={field.ref}
            required
            value={field.value === undefined ? undefined : field.value ? "Yes" : "No"}
          />
        )}
      />

      <div className="item-center flex w-full flex-col justify-start gap-2 md:flex-row md:gap-4">
        <Controller
          control={control}
          name="studyYear"
          render={({ field }) => (
            <Select
              error={errors.studyYear?.message}
              label="Year of Study"
              onChange={field.onChange}
              options={[
                { label: "First Year", value: "first-year" },
                { label: "Second Year", value: "second-year" },
                { label: "Third Year", value: "third-year" },
                { label: "Fourth Year", value: "fourth-year" },
                { label: "Fifth Year or Above", value: "fifth-year-or-above" },
              ]}
              ref={field.ref}
              required
              value={field.value}
            />
          )}
        />

        <Controller
          control={control}
          name="otherMajors"
          render={({ field }) => (
            <MultiSelect
              customTextInput
              error={errors.otherMajors?.message}
              label={isCompsciStudent === true ? "Other Majors (if any)" : "Other Majors"}
              onChange={field.onChange}
              options={[
                "Information and Technology Management",
                "Software Engineering",
                "Information Systems",
                "Mathematics",
              ]}
              ref={field.ref}
              required={isCompsciStudent !== true}
              value={field.value ?? []}
            />
          )}
        />
      </div>

      <Input
        {...register("heardAboutUs")}
        error={errors.heardAboutUs?.message}
        label="How did you hear about us?"
        required
        type="text"
      />

      <Input
        {...register("eventWishList")}
        error={errors.eventWishList?.message}
        label="What kinds of events would you like to see us host?"
        type="text"
      />

      <p className="paragraph-xs text-gray-500">
        By signing up, you agree to our{" "}
        <Link className="underline transition-colors hover:text-gray-700" href={Routes.PRIVACY}>
          Privacy Policy
        </Link>
        .
      </p>

      <div className="flex w-full gap-2">
        <Button
          onClick={() => {
            setStep2(getValues())
            prevStep()
          }}
          theme="light"
          type="button"
        >
          Back
        </Button>
        <Button disabled={loading} theme="dark" type="submit">
          {loading ? "Submitting..." : "Sign Up"}
        </Button>
      </div>
    </form>
  )
}
