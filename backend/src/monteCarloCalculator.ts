import { table, fixtures } from "./data"

type Team = {
  team: string
  points: number
  nrr: number
}

type MatchAnalysis = {
  match: string
  result1: string
  result2: string
  chance1: number
  chance2: number
  importance: number
}

const SIMULATIONS = 5000

function runSimulation(
  targetTeam: string,
  forcedResult?: {
    teamA: string
    teamB: string
    winner: string
  }
) {

  let qualifiedCount = 0

  for (
    let simulation = 0;
    simulation < SIMULATIONS;
    simulation++
  ) {

    // fresh table every simulation
    const simulatedTable: Team[] =
      structuredClone(table)

    // simulate all remaining fixtures
    fixtures.forEach(match => {

      const [teamA, teamB] = match

      let winner: string

      // forced outcome
      if (
        forcedResult &&
        forcedResult.teamA === teamA &&
        forcedResult.teamB === teamB
      ) {

        winner = forcedResult.winner

      } else {

        // random winner
        const teamAWins =
          Math.random() < 0.5

        winner =
          teamAWins
            ? teamA
            : teamB
      }

      // add points
      const winningTeam =
        simulatedTable.find(
          t => t.team === winner
        )

      if (winningTeam) {
        winningTeam.points += 2
      }

    })

    // IPL standings sort
    simulatedTable.sort((a, b) => {

      // points first
      if (b.points !== a.points) {
        return b.points - a.points
      }

      // NRR tiebreaker
      return b.nrr - a.nrr

    })

    // IPL playoff spots
    const top4 =
      simulatedTable.slice(0, 4)

    const qualified =
      top4.some(
        t => t.team === targetTeam
      )

    if (qualified) {
      qualifiedCount++
    }

  }

  return (
    qualifiedCount /
    SIMULATIONS
  ) * 100
}

export function monteCarloPlayoffCalculator(
  targetTeam: string
) {

  // overall qualification odds
  const overallChance =
    runSimulation(targetTeam)

  const analyses: MatchAnalysis[] = []

  fixtures.forEach(match => {

    const [teamA, teamB] = match

    // simulate if teamA wins
    const chanceA =
      runSimulation(targetTeam, {
        teamA,
        teamB,
        winner: teamA
      })

    // simulate if teamB wins
    const chanceB =
      runSimulation(targetTeam, {
        teamA,
        teamB,
        winner: teamB
      })

    // influence difference
    const rawImportance =
      Math.abs(chanceA - chanceB)

    analyses.push({

      match:
        `${teamA} vs ${teamB}`,

      result1:
        `${teamA} beat ${teamB}`,

      result2:
        `${teamB} beat ${teamA}`,

      chance1: Number(
        chanceA.toFixed(2)
      ),

      chance2: Number(
        chanceB.toFixed(2)
      ),

      importance: rawImportance

    })

  })

  // highest impact match
  const maxImportance =
    analyses.length > 0
      ? Math.max(
          ...analyses.map(
            a => a.importance
          )
        )
      : 1

  // normalize to 1-100
  const normalizedAnalyses =
    analyses.map(a => ({

      ...a,

      importance: Number(

        (
          maxImportance === 0
            ? 0
            : (
                a.importance /
                maxImportance
              ) * 100
        ).toFixed(0)

      )

    }))

  return {

    targetTeam,

    simulations: SIMULATIONS,

    overallChance: Number(
      overallChance.toFixed(2)
    ),

    matches: normalizedAnalyses

  }
}