"use client"

import { useState } from "react"

import { HeroSection } from "@/components/hero-section"
import { TeamSelectionGrid } from "@/components/team-selection-grid"
import { LoadingExperience } from "@/components/loading-experience"
import { AnalyticsPreview } from "@/components/analytics-preview"
import { Footer } from "@/components/footer"

type Match = {
  match: string
  result1: string
  result2: string
  chance1: number
  chance2: number
  importance: number
}

type TeamData = {
  targetTeam: string
  simulations: number
  overallChance: number
  matches: Match[]
}

export default function Home() {

  const [selectedTeam, setSelectedTeam] =
    useState<string | null>(null)

  const [isSimulating, setIsSimulating] =
    useState(false)

  const [teamData, setTeamData] =
    useState<TeamData | null>(null)

  async function handleTeamSelect(
    teamId: string
  ) {

    setSelectedTeam(teamId)

    setIsSimulating(true)

    setTeamData(null)

    try {

      // IMPORTANT FIX:
      // frontend ids are lowercase
      // backend expects uppercase

      const response = await fetch(
        `http://localhost:3000/team/${teamId.toUpperCase()}`
      )

      const data =
        await response.json()

      console.log(data)

      setTeamData(data)

    } catch (error) {

      console.log(error)

    }

    setIsSimulating(false)

  }

  function handleReset() {

    setSelectedTeam(null)

    setTeamData(null)

    setIsSimulating(false)

  }

  return (

    <main className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND GLOWS */}

      <div className="fixed inset-0 pointer-events-none">

        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-float" />

        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] animate-float"
          style={{
            animationDelay: "-3s"
          }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />

      </div>

      {/* MAIN CONTENT */}

      <div className="relative z-10">

        {isSimulating ? (

          <LoadingExperience
            teamId={selectedTeam}
          />

        ) : teamData ? (

          <AnalyticsPreview
            teamData={teamData}
            onBack={handleReset}
          />

        ) : (

          <>

            <HeroSection />

            <TeamSelectionGrid
              onTeamSelect={
                handleTeamSelect
              }
              selectedTeam={
                selectedTeam
              }
            />

            <Footer />

          </>

        )}

      </div>

    </main>

  )
}