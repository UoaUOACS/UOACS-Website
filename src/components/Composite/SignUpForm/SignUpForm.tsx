"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import type { z } from "zod"
import { Button } from "@/components/Primitive"
import { Input } from "@/components/Primitive/Input/Input"
import { MultiSelect } from "@/components/Primitive/MultiSelect/MultiSelect"
import { Select } from "@/components/Primitive/Select/Select"
import { createMemberSchema } from "@/types/schemas/member"

type FormInput = z.input<typeof createMemberSchema>
type FormOutput = z.output<typeof createMemberSchema>

export const SignUpForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(createMemberSchema),
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FormOutput) => {
    setLoading(true)
    console.log("Submitting form with data:", data)
    await Promise.all([
      new Promise((resolve) =>
        setTimeout(() => {
          console.log("Form Data:", JSON.stringify(data))
          resolve(undefined)
        }, 1000),
      ),
    ])
    setLoading(false)
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

      <div className="item-center flex w-full flex-col justify-start gap-2 md:flex-row md:gap-4">
        <Input
          {...register("email")}
          error={errors.email?.message}
          label="Email"
          required
          type="email"
        />
        <Input
          {...register("phoneNumber")}
          error={errors.phoneNumber?.message}
          label="Phone Number"
          type="text"
        />
      </div>

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
              label="Other Majors (if any)"
              onChange={field.onChange}
              options={[
                "Information and Technology Management",
                "Software Engineering",
                "Information Systems",
                "Mathematics",
              ]}
              ref={field.ref}
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

      <Button disabled={loading} theme="dark" type="submit">
        {loading ? "Submitting..." : "Sign Up"}
      </Button>
    </form>
  )
}
