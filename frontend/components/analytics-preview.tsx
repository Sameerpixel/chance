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

    <div className="min-h-screen px-4 py-8">

      <div className="max-w-6xl mx-auto">

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
          className="flex items-center gap-4 mb-12"
        >

          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-muted-foreground hover:text-white"
          >

            <ArrowLeft className="w-5 h-5" />

          </Button>

          <div>

            <h1 className="text-4xl sm:text-6xl font-black text-white">

              {teamData.targetTeam}

            </h1>

            <div className="flex items-center gap-4 mt-2">

              <span
                className={cn(
                  "text-5xl font-black",
                  getStatusColor()
                )}
              >

                {playoffChance}%

              </span>

              <span className="text-muted-foreground uppercase tracking-widest text-sm">

                Playoff Probability

              </span>

            </div>

          </div>

        </motion.div>

        {/* MATCH IMPACTS */}

        <div className="space-y-6">

          {teamData.matches.map(
            (match, index) => (

            <motion.div
              key={match.match}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay:
                  index * 0.08
              }}
              className="glass rounded-3xl p-6 border border-white/5"
            >

              {/* TOP */}

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                <div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white">

                    {match.match}

                  </h2>

                  <p className="text-muted-foreground mt-2">

                    Match impact on
                    {" "}
                    {teamData.targetTeam}
                    {" "}
                    playoff qualification

                  </p>

                </div>

                {/* IMPORTANCE */}

                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-orange-500/10 border border-orange-500/20">

                  <Zap className="w-5 h-5 text-orange-400" />

                  <div>

                    <p className="text-orange-400 text-sm uppercase tracking-wider">

                      Importance

                    </p>

                    <p className="text-3xl font-black text-white">

                      {match.importance.toFixed(1)}

                    </p>

                  </div>

                </div>

              </div>

              {/* SCENARIOS */}

              <div className="grid md:grid-cols-2 gap-5">

                {/* SCENARIO 1 */}

                <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">

                  <p className="text-green-400 text-sm uppercase tracking-widest mb-3">

                    Scenario 1

                  </p>

                  <h3 className="text-white text-lg font-semibold leading-relaxed">

                    {match.result1}

                  </h3>

                  <div className="mt-8">

                    <p className="text-sm text-muted-foreground uppercase tracking-widest">

                      Playoff Chance

                    </p>

                    <p className="text-6xl font-black text-green-400 mt-2">

                      {match.chance1.toFixed(2)}%

                    </p>

                  </div>

                </div>

                {/* SCENARIO 2 */}

                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">

                  <p className="text-red-400 text-sm uppercase tracking-widest mb-3">

                    Scenario 2

                  </p>

                  <h3 className="text-white text-lg font-semibold leading-relaxed">

                    {match.result2}

                  </h3>

                  <div className="mt-8">

                    <p className="text-sm text-muted-foreground uppercase tracking-widest">

                      Playoff Chance

                    </p>

                    <p className="text-6xl font-black text-red-400 mt-2">

                      {match.chance2.toFixed(2)}%

                    </p>

                  </div>

                </div>

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
          className="mt-10 text-center"
        >

          <p className="text-muted-foreground">

            Calculated using
            {" "}
            {teamData.simulations.toLocaleString()}
            {" "}
            Monte Carlo simulations

          </p>

        </motion.div>

      </div>

    </div>

  )
}