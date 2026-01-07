"use client"

import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"
import { ExecCard } from "@/components/Generic"
import { Button, Heading } from "@/components/Primitive"
import type { Executive } from "@/payload/payload-types"
import { ExecutiveTeam } from "@/types/enums"

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
  const currentExecs = execs?.docs.filter((exec: Executive) => exec.isCurrent)
  const pastExecs = execs?.docs.filter((exec: Executive) => !exec.isCurrent)

  const currentTeams = Array.from(
    new Set(currentExecs.map((exec: Executive) => exec.role.team).filter(Boolean)),
  ).sort((a, b) => TEAM_ORDER.indexOf(a as ExecutiveTeam) - TEAM_ORDER.indexOf(b as ExecutiveTeam))
  const pastTeams = Array.from(
    new Set(pastExecs.map((exec: Executive) => exec.role.team).filter(Boolean)),
  ).sort((a, b) => TEAM_ORDER.indexOf(a as ExecutiveTeam) - TEAM_ORDER.indexOf(b as ExecutiveTeam))

  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined)

  const handleTeamSelect = (team: string) => {
    if (selectedTeam === team) {
      setSelectedTeam(undefined)
    } else {
      setSelectedTeam(team)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <div className="relative">
          <span className="absolute top-0 right-0 translate-x-1/2 text-[#BDBDBD] text-xl md:text-3xl">
            {`[${currentExecs.length}]`}
          </span>
          <Heading h={1} period>
            Our Team
          </Heading>
        </div>
        <p className="text-md md:text-lg">These are the people who make this club possible.</p>
      </div>
      <div className="flex max-w-200 flex-row flex-wrap items-center justify-center gap-4">
        {currentTeams.map((team: string) => (
          <Button
            aria-pressed={selectedTeam === team}
            key={team}
            onClick={() => handleTeamSelect(team)}
            variant={{
              theme: selectedTeam === team ? "secondary" : "light",
              size: "sm-wide",
              border: selectedTeam === team,
            }}
          >
            {`${team.toUpperCase()} [${
              currentExecs.filter((exec: Executive) => exec.role.team === team).length
            }]`}
          </Button>
        ))}
      </div>
      <div className="grid w-full max-w-330 grid-cols-[repeat(auto-fill,128px)] justify-center gap-6 md:grid-cols-[repeat(auto-fill,200px)]">
        {currentExecs
          ?.filter((exec: Executive) => (selectedTeam ? exec.role.team === selectedTeam : true))
          .map((exec: Executive) => (
            <ExecCard exec={exec} key={exec.id} />
          ))}
      </div>
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <div className="relative">
          <span className="absolute top-0 right-0 translate-x-1/2 text-[#BDBDBD] text-xl md:text-3xl">
            {`[${pastExecs.length}]`}
          </span>
          <Heading h={1} period>
            Past Executives
          </Heading>
        </div>
        <p className="text-md md:text-lg">ex-uoacs executives</p>
      </div>
      <div className="grid w-full max-w-300 grid-cols-[repeat(auto-fill,16rem)] justify-center gap-6 md:gap-18">
        {pastTeams.map((team: string) => {
          const execsInTeam = pastExecs.filter((exec: Executive) => exec.role.team === team)
          return (
            <div key={team}>
              <p className="font-medium font-mono text-lg">
                {TEAM_DISPLAY_NAMES[team].toUpperCase()}
              </p>
              {execsInTeam.map((exec: Executive) => (
                <Link
                  className="flex w-64 flex-row items-center justify-between p-2 font-inter"
                  href={exec.linkedin ?? "#"}
                  key={exec.id}
                >
                  <p>{exec.name}</p>
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
