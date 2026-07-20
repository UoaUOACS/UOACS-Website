"use client"

import Link from "next/link"
import { useState } from "react"
import { ExecCard, Section } from "@/components/Generic"
import { BorderButton, Container, SocialIcon } from "@/components/Primitive"
import type { Executive } from "@/payload/payload-types"
import { EXECUTIVE_LEVEL_ORDER, ExecutiveLevel, ExecutiveTeam } from "@/types/enums"

/**
 * Mapping of executive teams to their display names
 */
const TEAM_DISPLAY_NAMES: Record<string, string> = {
  [ExecutiveTeam.PRESIDENT]: "President",
  [ExecutiveTeam.ADMIN]: "Admin",
  [ExecutiveTeam.DESIGN]: "Design",
  [ExecutiveTeam.EVENTS]: "Events",
  [ExecutiveTeam.MARKETING]: "Marketing",
  [ExecutiveTeam.TECH_EDU]: "Tech & Education",
}

/**
 * Order of teams for consistent display
 */
const TEAM_ORDER = [
  ExecutiveTeam.PRESIDENT,
  ExecutiveTeam.ADMIN,
  ExecutiveTeam.EVENTS,
  ExecutiveTeam.DESIGN,
  ExecutiveTeam.MARKETING,
  ExecutiveTeam.TECH_EDU,
]

/**
 * Ranks an exec by their primary (first-listed) team, for grouping purposes
 */
const primaryTeamRank = (exec: Executive): number => {
  const primaryTeam = exec.role?.teams?.[0]
  if (!primaryTeam) return TEAM_ORDER.length
  return TEAM_ORDER.indexOf(primaryTeam as ExecutiveTeam)
}

/**
 * Ranks an exec by their level (e.g. director vs executive), for grouping purposes
 */
const levelRank = (exec: Executive): number =>
  EXECUTIVE_LEVEL_ORDER.indexOf((exec.role?.level ?? ExecutiveLevel.EXECUTIVE) as ExecutiveLevel)

/**
 * A client component that displays the team page with current and past executives
 *
 * @param execs a payload response containing exec documents
 * @returns A client component that displays the team page with current and past executives
 */
export const TeamPageClient = ({ execs }: { execs: { docs: Executive[] } }) => {
  const currentExecs = execs?.docs
    .filter((exec: Executive) => exec.isCurrent)
    .sort((a, b) => {
      const levelDiff = levelRank(a) - levelRank(b)
      if (levelDiff !== 0) return levelDiff
      return primaryTeamRank(a) - primaryTeamRank(b)
    })
  const pastExecs = execs?.docs
    .filter((exec: Executive) => !exec.isCurrent)
    .sort(
      (a, b) =>
        EXECUTIVE_LEVEL_ORDER.indexOf(
          (a.role?.level ?? ExecutiveLevel.EXECUTIVE) as ExecutiveLevel,
        ) -
        EXECUTIVE_LEVEL_ORDER.indexOf(
          (b.role?.level ?? ExecutiveLevel.EXECUTIVE) as ExecutiveLevel,
        ),
    )

  const currentTeams = Array.from(
    new Set(currentExecs.flatMap((exec: Executive) => exec.role?.teams ?? []).filter(Boolean)),
  ).sort((a, b) => TEAM_ORDER.indexOf(a as ExecutiveTeam) - TEAM_ORDER.indexOf(b as ExecutiveTeam))

  const pastTeams = Array.from(
    new Set(pastExecs.flatMap((exec: Executive) => exec.role?.teams ?? []).filter(Boolean)),
  ).sort((a, b) => TEAM_ORDER.indexOf(a as ExecutiveTeam) - TEAM_ORDER.indexOf(b as ExecutiveTeam))

  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined)

  const handleTeamSelect = (team: string) => {
    if (selectedTeam === team) {
      setSelectedTeam(undefined)
    } else {
      setSelectedTeam(team)
    }
  }

  const toTeam = (str: string): ExecutiveTeam => {
    if (Object.values(ExecutiveTeam).includes(str as ExecutiveTeam)) {
      return str as ExecutiveTeam
    }
    throw new Error(`Invalid team: ${str}`)
  }

  return (
    <>
      <Section
        subtitle="These are the people who make this club possible."
        title="Our Team"
        titleProps={{ h: 1, period: true }}
      >
        <div className="flex w-full flex-col items-center justify-center gap-12">
          <div className="hidden max-w-200 flex-row flex-wrap items-center justify-center gap-4 md:flex">
            {currentTeams.map((team: string) => (
              <BorderButton
                aria-pressed={selectedTeam === team}
                key={team}
                onClick={() => handleTeamSelect(team)}
                variant={{
                  theme: selectedTeam === team ? "primary" : "light",
                  size: "sm-wide",
                  border: selectedTeam === team,
                }}
              >
                {`${team.toUpperCase()} [${
                  currentExecs.filter((exec: Executive) =>
                    (exec.role?.teams ?? []).includes(toTeam(team)),
                  ).length
                }]`}
              </BorderButton>
            ))}
          </div>
          <div className="grid w-full grid-cols-[repeat(auto-fit,128px)] justify-center gap-2 md:grid-cols-[repeat(auto-fit,200px)] md:gap-6">
            {currentExecs
              ?.filter((exec: Executive) =>
                selectedTeam ? (exec.role?.teams ?? []).includes(toTeam(selectedTeam)) : true,
              )
              .map((exec: Executive) => (
                <ExecCard exec={exec} key={exec.id} />
              ))}
          </div>
        </div>
      </Section>
      <Section subtitle="UOACS Alumni" title="Past Executives" titleProps={{ h: 1, period: true }}>
        <div className="grid w-full grid-cols-1 justify-center gap-12 md:grid-cols-[repeat(auto-fill,22.5rem)] md:gap-x-16 md:gap-y-18">
          {pastTeams.map((team: string) => {
            const execsInTeam = pastExecs.filter((exec: Executive) =>
              (exec.role?.teams ?? []).includes(toTeam(team)),
            )
            return (
              <Container
                className="flex w-full flex-col gap-0 px-3 py-6 md:gap-2.5"
                key={team}
                theme="primary"
                title={TEAM_DISPLAY_NAMES[team]}
              >
                {execsInTeam.map((exec: Executive) =>
                  exec.linkedin ? (
                    <Link
                      className="flex w-full flex-row items-center justify-between rounded-sm px-3 py-1.5 font-inter transition-all duration-300 hover:bg-gray-600-opaque md:max-w-90"
                      href={exec.linkedin}
                      key={exec.id}
                    >
                      <p className="heading-4 font-normal">{exec.name}</p>
                      {exec.linkedin && <SocialIcon.LinkedIn className="h-7 w-7 md:h-8 md:w-8" />}
                    </Link>
                  ) : (
                    <p
                      className="heading-4 w-full p-2 px-3 py-1.5 font-normal md:max-w-90"
                      key={exec.id}
                    >
                      {exec.name}
                    </p>
                  ),
                )}
              </Container>
            )
          })}
        </div>
      </Section>
    </>
  )
}
