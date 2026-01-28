"use client"

import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"
import { ExecCard } from "@/components/Generic"
import { Button, Heading } from "@/components/Primitive"
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
 * A client component that displays the team page with current and past executives
 *
 * @param execs a payload response containing exec documents
 * @returns A client component that displays the team page with current and past executives
 */
export const TeamPageClient = ({ execs }: { execs: { docs: Executive[] } }) => {
  const currentExecs = execs?.docs
    .filter((exec: Executive) => exec.isCurrent)
    .sort(
      (a, b) =>
        EXECUTIVE_LEVEL_ORDER.indexOf(
          (a.role?.level ?? ExecutiveLevel.EXECUTIVE) as ExecutiveLevel,
        ) -
        EXECUTIVE_LEVEL_ORDER.indexOf(
          (b.role?.level ?? ExecutiveLevel.EXECUTIVE) as ExecutiveLevel,
        ),
    )
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
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <Heading h={1} period>
          Our Team
        </Heading>
        <p className="paragraph">These are the people who make this club possible.</p>
      </div>
      <div className="flex max-w-200 flex-row flex-wrap items-center justify-center gap-4">
        {currentTeams.map((team: string) => (
          <Button
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
          </Button>
        ))}
      </div>
      <div className="grid w-full max-w-330 grid-cols-[repeat(auto-fill,128px)] justify-center gap-6 md:grid-cols-[repeat(auto-fill,200px)]">
        {currentExecs
          ?.filter((exec: Executive) =>
            selectedTeam ? (exec.role?.teams ?? []).includes(toTeam(selectedTeam)) : true,
          )
          .map((exec: Executive) => (
            <ExecCard exec={exec} key={exec.id} />
          ))}
      </div>
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <div className="relative">
          <Heading h={1} period>
            Past Executives
          </Heading>
        </div>
        <p className="paragraph">ex-uoacs executives</p>
      </div>
      <div className="grid w-full max-w-330 grid-cols-[repeat(auto-fill,22.5rem)] justify-center gap-6 md:gap-18">
        {pastTeams.map((team: string) => {
          const execsInTeam = pastExecs.filter((exec: Executive) =>
            (exec.role?.teams ?? []).includes(toTeam(team)),
          )
          return (
            <div key={team}>
              <p className="font-medium font-mono text-lg">
                {TEAM_DISPLAY_NAMES[team].toUpperCase()}
              </p>
              {execsInTeam.map((exec: Executive) => (
                <Link
                  className="flex w-90 flex-row items-center justify-between p-2 font-inter"
                  href={exec.linkedin ?? "#"}
                  key={exec.id}
                >
                  <p className="paragraph">{exec.name}</p>
                  <FontAwesomeIcon fontSize={24} icon={faLinkedin} />
                </Link>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}
