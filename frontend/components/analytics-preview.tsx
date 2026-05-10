"use client"

import { motion } from "framer-motion"

import {
  ArrowLeft,
  Zap
} from "lucide-react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

type MatchData = {
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
  matches: MatchData[]
}

interface AnalyticsPreviewProps {
  teamData: TeamData
  onBack: () => void
}

export function AnalyticsPreview({
  teamData,
  onBack
}: AnalyticsPreviewProps) {

  const playoffChance =
    Number(
      teamData.overallChance.toFixed(2)
    )

  function getStatusColor() {

    if (playoffChance >= 75) {
      return "text-green-400"
    }

    if (playoffChance >= 40) {
      return "text-orange-400"
    }

    return "text-red-400"

  }

  return (

    <div className="min-h-screen px-3 py-6">

      <div className="max-w-[1700px] mx-auto">

        {/* HEADER */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="flex items-center gap-3 mb-8"
        >

          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-muted-foreground hover:text-white h-8 w-8"
          >

            <ArrowLeft className="w-4 h-4" />

          </Button>

          <div>

            <h1 className="text-3xl sm:text-5xl font-black text-white">

              {teamData.targetTeam}

            </h1>

            <div className="flex items-center gap-3 mt-1">

              <span
                className={cn(
                  "text-3xl sm:text-4xl font-black",
                  getStatusColor()
                )}
              >

                {playoffChance}%

              </span>

              <span className="text-muted-foreground uppercase tracking-widest text-[10px]">

                Playoff Probability

              </span>

            </div>

          </div>

        </motion.div>

        {/* MATCH GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

          {teamData.matches.map(
            (match, index) => (

            <motion.div
              key={match.match}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay:
                  index * 0.03
              }}
              className="glass rounded-xl p-3 border border-white/5"
            >

              {/* TOP */}

              <div className="flex items-start justify-between gap-2 mb-3">

                <div>

                  <h2 className="text-sm font-bold text-white">

                    {match.match}

                  </h2>

                  <p className="text-[9px] text-muted-foreground mt-1">

                    Impact on
                    {" "}
                    {teamData.targetTeam}

                  </p>

                </div>

                {/* IMPACT */}

                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20">

                  <Zap className="w-3 h-3 text-orange-400" />

                  <span className="text-xs font-black text-white">

                    {match.importance.toFixed(0)}

                  </span>

                </div>

              </div>

              {/* SCENARIO 1 */}

              <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 mb-2">

                <p className="text-green-400 text-[9px] uppercase tracking-widest mb-1">

                  Scenario 1

                </p>

                <h3 className="text-white text-[11px] font-medium leading-snug">

                  {match.result1}

                </h3>

                <p className="text-2xl font-black text-green-400 mt-3">

                  {match.chance1.toFixed(2)}%

                </p>

              </div>

              {/* SCENARIO 2 */}

              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">

                <p className="text-red-400 text-[9px] uppercase tracking-widest mb-1">

                  Scenario 2

                </p>

                <h3 className="text-white text-[11px] font-medium leading-snug">

                  {match.result2}

                </h3>

                <p className="text-2xl font-black text-red-400 mt-3">

                  {match.chance2.toFixed(2)}%

                </p>

              </div>

            </motion.div>

          ))}

        </div>

        {/* FOOTER */}

        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 0.5
          }}
          className="mt-6 text-center"
        >

          <p className="text-muted-foreground text-xs">

            {teamData.simulations.toLocaleString()}
            {" "}
            Monte Carlo simulations

          </p>

        </motion.div>

      </div>

    </div>

  )
}