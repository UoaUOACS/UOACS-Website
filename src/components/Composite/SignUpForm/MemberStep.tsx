"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import type { z as zType } from "zod"
import { z } from "zod"
import { Button, Radio } from "@/components/Primitive"
import { Input } from "@/components/Primitive/Input/Input"
import { MultiSelect } from "@/components/Primitive/MultiSelect/MultiSelect"
import { Select } from "@/components/Primitive/Select/Select"
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
    router.prefetch(Routes.HOME)
    setLoading(true)
    try {
      const response = await fetch(ApiRoutes.SIGN_UP.ROOT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...step1, ...step2Data }),
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
      reset()
      router.push(Routes.LOGIN)
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
        <Input {...register("upi")} error={errors.upi?.message} label="UPI" required type="text" />
        <Input
          {...register("uoaID")}
          error={errors.uoaID?.message}
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
        {...register("eventWishlist")}
        error={errors.eventWishlist?.message}
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
