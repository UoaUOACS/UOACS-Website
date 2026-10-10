"use client"

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Select, TextArea } from "@uoacs/ui"
import { toast } from "@uoacs/ui/toast"
import { useRouter } from "next/navigation"
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form"
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

type EditProfileFormValues = z.infer<typeof editProfileFormSchema>

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
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      username: member.username,
      bio: member.bio ?? "",
      languages,
      skills: member.skills ?? [],
      // Only the editable fields, as Payload's row `id` would clash with the field array's own key
      links: member.links?.map(({ name, url }) => ({ name, url })) ?? [],
    },
  })
  const linkFields = useFieldArray({ control, name: "links" })
  const currentLinks = useWatch({ control, name: "links" })
  const unusedLinkName = LINK_NAMES.find((name) => !currentLinks.some((row) => row.name === name))
  const profilePictureURL =
    typeof member.profilePicture === "object" ? member.profilePicture?.url : undefined

  const onSubmit = async (values: EditProfileFormValues) => {
    try {
      const result = await editMember({
        bio: values.bio,
        skills: values.skills,
        links: values.links,
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
  }

  return (
    <form
      className="flex w-full max-w-xl flex-col gap-8"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="font-mono">
        {/** biome-ignore lint/suspicious/noCommentText: the // is not for a comment */}
        <span className="text-primary">// </span>EDIT PROFILE
      </p>

      <ProfilePictureField currentURL={profilePictureURL} />

      <Input
        {...register("username")}
        className="bg-white font-sans"
        error={errors.username?.message}
        label="Username"
      />

      <TextArea
        {...register("bio")}
        className="min-h-32 bg-white p-4 font-sans"
        error={errors.bio?.message}
        label="Bio"
        placeholder="Tell people a bit about yourself"
      />

      <Controller
        control={control}
        name="languages"
        render={({ field }) => (
          <ChipSelect
            addLabel="Add a language"
            error={errors.languages?.message}
            label="Language"
            onChange={field.onChange}
            options={LANGUAGES}
            value={field.value}
          />
        )}
      />

      <Controller
        control={control}
        name="skills"
        render={({ field }) => (
          <ChipSelect
            addLabel="Add a skill"
            error={errors.skills?.message}
            label="Skills"
            onChange={field.onChange}
            options={skills}
            value={field.value}
          />
        )}
      />

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 font-medium font-mono text-gray-700 text-sm">Links</legend>
        {linkFields.fields.map((row, index) => {
          // `row` keeps the value it was added with, so the selected type comes from the form
          const link = links[currentLinks[index]?.name ?? row.name]
          return (
            <div className="flex items-start gap-2" key={row.id}>
              <div className="w-32 shrink-0 sm:w-44">
                <Controller
                  control={control}
                  name={`links.${index}.name`}
                  render={({ field }) => (
                    <Select
                      error={errors.links?.[index]?.name?.message}
                      onChange={field.onChange}
                      options={LINK_OPTIONS}
                      ref={field.ref}
                      value={field.value}
                    />
                  )}
                />
              </div>
              <div className="min-w-0 flex-1">
                <Input
                  {...register(`links.${index}.url`)}
                  aria-label={`${link.name} URL`}
                  className="min-h-11 bg-white font-sans text-sm"
                  error={errors.links?.[index]?.url?.message}
                  placeholder={link.url}
                  type="url"
                />
              </div>
              <Button
                aria-label={`Remove ${link.name} link`}
                className="size-11"
                onClick={() => linkFields.remove(index)}
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
            onClick={() => linkFields.append({ name: unusedLinkName, url: "" })}
            theme="ghost"
          >
            Add a link
          </Button>
        )}
      </fieldset>

      <div className="flex gap-2">
        <Button disabled={isSubmitting} theme="dark" type="submit">
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
        <Button onClick={() => router.back()} theme="ghost">
          Back
        </Button>
      </div>
    </form>
  )
}
