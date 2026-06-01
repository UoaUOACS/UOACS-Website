"use client"

import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { ToggleableInput } from "@/components/Generic"
import { Button, Heading, Input, MultiSelect, Radio, Select } from "@/components/Primitive"
import type { Member } from "@/payload/payload-types"

const STUDY_YEAR_OPTIONS = [
  { label: "First Year", value: "first-year" },
  { label: "Second Year", value: "second-year" },
  { label: "Third Year", value: "third-year" },

  { label: "Fifth Year or Above", value: "fifth-year-or-above" },
]

const OTHER_MAJORS_OPTIONS = [
  "Information and Technology Management",
  "Software Engineering",
  "Information Systems",
  "Mathematics",
]

export type ProfilePageClientProps = {
  member: Member
}

export const ProfilePageClient = ({ member }: ProfilePageClientProps) => {
  const [firstName, setFirstName] = useState(member.firstName ?? "")
  const [lastName, setLastName] = useState(member.lastName ?? "")
  const [email, setEmail] = useState(member.email ?? "")
  const [upi, setUpi] = useState(member.upi ?? "")
  const [uoaID, setUoaID] = useState(member.uoaID ?? "")
  const [phoneNumber, setPhoneNumber] = useState(member.phoneNumber ?? "")
  const [gender, setGender] = useState(member.gender ?? "")
  const [studyYear, setStudyYear] = useState<string>(member.studyYear ?? "")
  const [compsciStudent, setCompsciStudent] = useState(
    member.compsciStudent === true ? "Yes" : member.compsciStudent === false ? "No" : undefined,
  )
  const [otherMajors, setOtherMajors] = useState<string[]>(member.otherMajors ?? [])
  const [heardAboutUs, setHeardAboutUs] = useState(member.heardAboutUs ?? "")
  const [eventWishlist, setEventWishlist] = useState(member.eventWishList ?? "")

  const handleSave = () => {
    // TODO: persist field update
  }

  return (
    <div className="flex w-full flex-col gap-12">
      <section className="flex w-full flex-col items-start gap-2">
        <p className="font-mono font-paragraph">
          {/** biome-ignore lint/suspicious/noCommentText: the // is not for a comment */}
          <span className="text-primary">// </span>YOUR ACCOUNT
        </p>
        <Heading h={2} period>
          {`${member.firstName} ${member.lastName}`}
        </Heading>
        <p className="flex flex-row justify-start gap-2 font-mono text-paragraph-sm">
          <span>
            UPI <span className="font-bold text-black">{member.upi ?? "N/A"}</span>
          </span>
          <span> / </span>
          <span>
            ID <span className="font-bold text-black">{member.uoaID ?? "N/A"}</span>
          </span>
        </p>
      </section>
      <section className="flex w-full flex-col items-start gap-6">
        <div className="flex flex-col items-start gap-2">
          <p className="font-mono font-paragraph">
            {/** biome-ignore lint/suspicious/noCommentText: the // is not for a comment */}
            <span className="text-primary">// </span>MEMBER DETAILS
          </p>
          <Heading h={3}>Your Info</Heading>
        </div>
        <div className="flex w-full flex-col items-start gap-4">
          <ToggleableInput displayNode={firstName} label="First Name" onSave={handleSave}>
            <Input onChange={(e) => setFirstName(e.target.value)} type="text" value={firstName} />
          </ToggleableInput>

          <ToggleableInput displayNode={lastName} label="Last Name" onSave={handleSave}>
            <Input onChange={(e) => setLastName(e.target.value)} type="text" value={lastName} />
          </ToggleableInput>

          <ToggleableInput
            displayNode={email}
            label="Email"
            locked
            lockedReason="Email is used for login and cannot be changed here"
          >
            <Input onChange={(e) => setEmail(e.target.value)} type="email" value={email} />
          </ToggleableInput>

          <ToggleableInput
            displayNode={upi}
            label="UPI"
            locked
            lockedReason="UPI is your university identifier and cannot be changed here"
          >
            <Input onChange={(e) => setUpi(e.target.value)} type="text" value={upi} />
          </ToggleableInput>

          <ToggleableInput
            displayNode={uoaID}
            label="UOA ID Number"
            locked
            lockedReason="Your student ID cannot be changed here"
          >
            <Input onChange={(e) => setUoaID(e.target.value)} type="text" value={uoaID} />
          </ToggleableInput>

          <ToggleableInput displayNode={gender} label="Gender" onSave={handleSave}>
            <Select
              onChange={setGender}
              options={["Male", "Female", "Other", "Prefer not to say"]}
              value={gender}
            />
          </ToggleableInput>

          <ToggleableInput displayNode={phoneNumber} label="Phone Number" onSave={handleSave}>
            <Input
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              value={phoneNumber}
            />
          </ToggleableInput>

          <ToggleableInput
            displayNode={compsciStudent ?? ""}
            label="Are you a computer science student?"
            onSave={handleSave}
          >
            <Radio
              onChange={setCompsciStudent}
              options={["Yes", "No"]}
              optionsClassName="flex-row"
              value={compsciStudent}
            />
          </ToggleableInput>

          <ToggleableInput
            displayNode={STUDY_YEAR_OPTIONS.find((o) => o.value === studyYear)?.label ?? studyYear}
            label="Year of Study"
            onSave={handleSave}
          >
            <Select onChange={setStudyYear} options={STUDY_YEAR_OPTIONS} value={studyYear} />
          </ToggleableInput>

          <ToggleableInput
            displayNode={otherMajors.join(", ")}
            label={compsciStudent === "Yes" ? "Other Majors (if any)" : "Other Majors"}
            onSave={handleSave}
          >
            <MultiSelect
              customTextInput
              onChange={setOtherMajors}
              options={OTHER_MAJORS_OPTIONS}
              value={otherMajors}
            />
          </ToggleableInput>

          <ToggleableInput
            displayNode={heardAboutUs}
            label="How did you hear about us?"
            onSave={handleSave}
          >
            <Input
              onChange={(e) => setHeardAboutUs(e.target.value)}
              type="text"
              value={heardAboutUs}
            />
          </ToggleableInput>

          <ToggleableInput
            displayNode={eventWishlist}
            label="What kinds of events would you like to see us host?"
            onSave={handleSave}
          >
            <Input
              onChange={(e) => setEventWishlist(e.target.value)}
              type="text"
              value={eventWishlist}
            />
          </ToggleableInput>
        </div>
      </section>
      <section>
        <div className="flex flex-row justify-between">
          <p className="font-mono">
            Signed in as{" "}
            <span className="font-bold">{`${member.firstName} ${member.lastName}`}</span>
          </p>
          <Button
            className="whitespace-nowrap"
            left={<ArrowLeftEndOnRectangleIcon className="h-4 w-4 md:h-6 md:w-6" />}
            onClick={() => {}}
            theme="dark"
          >
            Sign Out
          </Button>
        </div>
      </section>
    </div>
  )
}
