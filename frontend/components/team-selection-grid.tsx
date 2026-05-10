"use client"

import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface Team {
  id: string
  name: string
  abbreviation: string
  primaryColor: string
}

const teams: Team[] = [

  {
    id: "csk",
    name: "Chennai Super Kings",
    abbreviation: "CSK",
    primaryColor: "#ffc107"
  },

  {
    id: "mi",
    name: "Mumbai Indians",
    abbreviation: "MI",
    primaryColor: "#004ba0"
  },

  {
    id: "rcb",
    name: "Royal Challengers Bengaluru",
    abbreviation: "RCB",
    primaryColor: "#d4171f"
  },

  {
    id: "kkr",
    name: "Kolkata Knight Riders",
    abbreviation: "KKR",
    primaryColor: "#3a225d"
  },

  {
    id: "dc",
    name: "Delhi Capitals",
    abbreviation: "DC",
    primaryColor: "#004c93"
  },

  {
    id: "pbks",
    name: "Punjab Kings",
    abbreviation: "PBKS",
    primaryColor: "#ed1b24"
  },

  {
    id: "rr",
    name: "Rajasthan Royals",
    abbreviation: "RR",
    primaryColor: "#ea1a85"
  },

  {
    id: "srh",
    name: "Sunrisers Hyderabad",
    abbreviation: "SRH",
    primaryColor: "#f7a721"
  },

  {
    id: "gt",
    name: "Gujarat Titans",
    abbreviation: "GT",
    primaryColor: "#0b4973"
  },

  {
    id: "lsg",
    name: "Lucknow Super Giants",
    abbreviation: "LSG",
    primaryColor: "#a72056"
  }

]

interface TeamSelectionGridProps {
  onTeamSelect: (
    teamId: string
  ) => void
  selectedTeam: string | null
}

export function TeamSelectionGrid({
  onTeamSelect,
  selectedTeam
}: TeamSelectionGridProps) {

  return (

    <section className="px-4 py-20 max-w-7xl mx-auto">

      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 0.6
        }}
        className="text-center mb-14"
      >

        <h2 className="text-3xl sm:text-5xl font-black text-white mb-4">

          CHOOSE YOUR TEAM

        </h2>

        <p className="text-muted-foreground text-lg">

          Run Monte Carlo playoff simulations
          for every remaining IPL scenario

        </p>

      </motion.div>

      {/* GRID */}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">

        {teams.map(
          (team, index) => (

          <TeamCard
            key={team.id}
            team={team}
            index={index}
            isSelected={
              selectedTeam === team.id
            }
            onSelect={() =>
              onTeamSelect(team.id)
            }
          />

        ))}

      </div>

    </section>

  )
}

interface TeamCardProps {
  team: Team
  index: number
  isSelected: boolean
  onSelect: () => void
}

function TeamCard({
  team,
  index,
  isSelected,
  onSelect
}: TeamCardProps) {

  return (

    <motion.button
      initial={{
        opacity: 0,
        y: 30
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05
      }}
      whileHover={{
        scale: 1.03,
        y: -5
      }}
      whileTap={{
        scale: 0.98
      }}
      onClick={onSelect}
      className={cn(
        "relative group p-6 rounded-3xl overflow-hidden transition-all duration-300 glass border border-white/5",
        isSelected &&
        "border-orange-500/50"
      )}
      style={{
        background:
          `linear-gradient(
            135deg,
            ${team.primaryColor}20 0%,
            transparent 70%
          )`
      }}
    >

      {/* GLOW */}

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            `radial-gradient(
              circle at center,
              ${team.primaryColor}25 0%,
              transparent 70%
            )`
        }}
      />

      {/* CONTENT */}

      <div className="relative z-10 flex flex-col items-center">

        {/* TEAM ICON */}

        <div
          className="w-20 h-20 rounded-full mb-5 flex items-center justify-center font-black text-2xl border-2 transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor:
              `${team.primaryColor}20`,
            borderColor:
              team.primaryColor,
            color:
              team.primaryColor
          }}
        >

          {team.abbreviation}

        </div>

        {/* NAME */}

        <h3 className="text-xl font-black text-white mb-2">

          {team.abbreviation}

        </h3>

        <p className="text-sm text-muted-foreground text-center leading-relaxed">

          {team.name}

        </p>

        {/* CTA */}

        <div className="mt-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-white group-hover:bg-orange-500/20 group-hover:border-orange-500/30 transition-all">

          Analyze Chances

        </div>

      </div>

      {/* SHIMMER */}

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">

        <div className="absolute inset-0 animate-shimmer" />

      </div>

    </motion.button>

  )
}