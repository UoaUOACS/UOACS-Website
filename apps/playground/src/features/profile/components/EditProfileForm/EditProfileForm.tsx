"use client"

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { revalidateLogic, useForm } from "@tanstack/react-form"
import { Button, Input, Select, TextArea } from "@uoacs/ui"
import { toast } from "@uoacs/ui/toast"
import { cn } from "@uoacs/ui/utils"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { type EditMemberResult, editMember } from "@/features/member/actions/editMember"
import { type LinkName, links } from "@/features/member/constants/links.constants"
import { skills } from "@/features/member/constants/skills.constants"
import { editMemberSchema } from "@/features/member/schemas/editMember.schema"
import { LANGUAGES } from "@/features/profile/profile.constants"
import type { Member } from "@/payload/payload-types"
import { ChipSelect } from "./ChipSelect/ChipSelect"
import { ProfilePictureField } from "./ProfilePictureField/ProfilePictureField"

const LINK_NAMES = Object.keys(links) as LinkName[]
const LINK_OPTIONS = LINK_NAMES.map((value) => ({ label: links[value].name, value }))

// The pink focus border of the shared PinInput
const FOCUS_CLASS_NAME = "focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"

const ERROR_MESSAGES: Record<Extract<EditMemberResult, { ok: false }>["error"], string> = {
  invalid: "Some of your details are invalid. Check them and try again.",
  unauthenticated: "Log in to edit your profile.",
  unavailable: "Something went wrong. Try again.",
  server: "Something went wrong. Try again.",
}

/**
 * `editMemberSchema` plus the fields `editMember` cannot save yet, which the form shows but does
 * not send.
 */
const editProfileFormSchema = editMemberSchema.extend({
  username: z.string().trim().min(1, "Username is required."),
  languages: z.array(z.string()),
})

type EditProfileFormValues = z.input<typeof editProfileFormSchema>

/**
 * The message to show under a field. Fields show one error at a time.
 */
const firstError = (errors: readonly ({ message: string } | undefined)[]) => errors[0]?.message

export interface EditProfileFormProps {
  /**
   * The signed-in member's current profile, used as the starting values.
   */
  member: Pick<Member, "username" | "profilePicture" | "bio" | "skills" | "links">
  /**
   * The member's languages. No data source exists yet, so these are not saved.
   */
  languages?: string[]
}

/**
 * The "Edit Profile" form for the member's playground profile.
 *
 * Saves the bio, skills and links. The profile picture, username and languages are shown but not
 * saved yet, as `editMember` does not take them.
 */
export const EditProfileForm = ({ member, languages = [] }: EditProfileFormProps) => {
  const router = useRouter()
  const defaultValues: EditProfileFormValues = {
    username: member.username,
    bio: member.bio ?? "",
    languages,
    skills: member.skills ?? [],
    links: member.links?.map(({ name, url }) => ({ name, url })) ?? [],
  }
  const form = useForm({
    defaultValues,
    // Checks on submit, then on every change once the member has tried to submit
    validationLogic: revalidateLogic(),
    validators: { onDynamic: editProfileFormSchema },
    onSubmit: async ({ value }) => {
      try {
        const result = await editMember({
          bio: value.bio,
          skills: value.skills,
          links: value.links,
        })
        if (!result.ok) {
          toast.error({ description: ERROR_MESSAGES[result.error] })
          return
        }
        toast.success({ description: "Profile updated" })
      } catch (error) {
        console.error("[EditProfileForm] Failed to save the profile", { error })
        toast.error({ description: ERROR_MESSAGES.server })
      }
    },
  })
  const profilePictureURL =
    typeof member.profilePicture === "object" ? member.profilePicture?.url : undefined

  return (
    <form
      className="flex w-full max-w-xl flex-col gap-8"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        form.handleSubmit()
      }}
    >
      <p className="font-mono">
        {/** biome-ignore lint/suspicious/noCommentText: the // is not for a comment */}
        <span className="text-primary">// </span>EDIT PROFILE
      </p>

      <ProfilePictureField currentURL={profilePictureURL} />

      <form.Field name="username">
        {(field) => (
          <Input
            className={cn("bg-white font-sans", FOCUS_CLASS_NAME)}
            error={firstError(field.state.meta.errors)}
            label="Username"
            onBlur={field.handleBlur}
            onChange={(event) => field.handleChange(event.target.value)}
            value={field.state.value}
          />
        )}
      </form.Field>

      <form.Field name="bio">
        {(field) => (
          <TextArea
            className={cn("min-h-32 bg-white p-4 font-sans", FOCUS_CLASS_NAME)}
            error={firstError(field.state.meta.errors)}
            label="Bio"
            onBlur={field.handleBlur}
            onChange={(event) => field.handleChange(event.target.value)}
            placeholder="Tell people a bit about yourself"
            value={field.state.value ?? ""}
          />
        )}
      </form.Field>

      <form.Field name="languages">
        {(field) => (
          <ChipSelect
            addLabel="Add a language"
            error={firstError(field.state.meta.errors)}
            label="Language"
            onChange={field.handleChange}
            options={LANGUAGES}
            value={field.state.value}
          />
        )}
      </form.Field>

      <form.Field name="skills">
        {(field) => (
          <ChipSelect
            addLabel="Add a skill"
            error={firstError(field.state.meta.errors)}
            label="Skills"
            onChange={field.handleChange}
            options={skills}
            value={field.state.value}
          />
        )}
      </form.Field>

      <form.Field name="links">
        {(linksField) => {
          const unusedLinkName = LINK_NAMES.find(
            (name) => !linksField.state.value.some((row) => row.name === name),
          )
          return (
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-2 font-medium font-mono text-gray-700 text-sm">Links</legend>
              {linksField.state.value.map((row, index) => {
                const link = links[row.name]
                return (
                  // biome-ignore lint/suspicious/noArrayIndexKey: rows have no id, and each input reads its value from the form, so index keys stay in sync
                  <div className="flex items-start gap-2" key={index}>
                    <div className="w-32 shrink-0 sm:w-44">
                      <form.Field name={`links[${index}].name`}>
                        {(field) => (
                          <Select
                            error={firstError(field.state.meta.errors)}
                            onChange={(value) => field.handleChange(value as LinkName)}
                            options={LINK_OPTIONS}
                            value={field.state.value}
                          />
                        )}
                      </form.Field>
                    </div>
                    <div className="min-w-0 flex-1">
                      <form.Field name={`links[${index}].url`}>
                        {(field) => (
                          <Input
                            aria-label={`${link.name} URL`}
                            className={cn("min-h-11 bg-white font-sans text-sm", FOCUS_CLASS_NAME)}
                            error={firstError(field.state.meta.errors)}
                            onBlur={field.handleBlur}
                            onChange={(event) => field.handleChange(event.target.value)}
                            placeholder={link.url}
                            type="url"
                            value={field.state.value}
                          />
                        )}
                      </form.Field>
                    </div>
                    <Button
                      aria-label={`Remove ${link.name} link`}
                      className="size-11"
                      onClick={() => linksField.removeValue(index)}
                      size="icon"
                      theme="ghost"
                    >
                      <XMarkIcon className="size-5" />
                    </Button>
                  </div>
                )
              })}
              {/* Each link type can be added once, so the button goes once every type is used */}
              {unusedLinkName && (
                <Button
                  className="font-normal text-gray-500 text-xs"
                  left={<PlusIcon className="size-4 text-black" />}
                  onClick={() => linksField.pushValue({ name: unusedLinkName, url: "" })}
                  theme="ghost"
                >
                  Add a link
                </Button>
              )}
            </fieldset>
          )
        }}
      </form.Field>

      <div className="flex gap-2">
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button disabled={isSubmitting} theme="dark" type="submit">
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          )}
        </form.Subscribe>
        <Button onClick={() => router.back()} theme="ghost">
          Back
        </Button>
      </div>
    </form>
  )
}
