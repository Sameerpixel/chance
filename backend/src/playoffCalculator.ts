import { table, fixtures } from "./data"

type Team = {
  team: string
  points: number
}

type ResultStats = Record<
  string,
  {
    total: number
    qualified: number
  }
>

export function calculatePlayoffChances(
  targetTeam: string
) {

  let totalScenarios = 0
  let qualifyingScenarios = 0

  const resultStats: ResultStats = {}

  function simulate(
    matchIndex: number,
    currentTable: Team[],
    results: string[]
  ) {

    if (matchIndex === fixtures.length) {

      totalScenarios++

      const sortedTable = [...currentTable].sort(
        (a, b) => b.points - a.points
      )

      const top4 = sortedTable.slice(0, 4)

      const qualified = top4.some(
        team => team.team === targetTeam
      )

      if (qualified) {
        qualifyingScenarios++
      }

      results.forEach(result => {

        if (!resultStats[result]) {
          resultStats[result] = {
            total: 0,
            qualified: 0
          }
        }

        resultStats[result]!.total++

        if (qualified) {
          resultStats[result]!.qualified++
        }

      })

      return
    }

    const [teamA, teamB] =
      fixtures[matchIndex]!

    // TEAM A WINS
    const tableA = structuredClone(currentTable)

    const winnerA = tableA.find(
      t => t.team === teamA
    )

    if (winnerA) {
      winnerA.points += 2
    }

    simulate(
      matchIndex + 1,
      tableA,
      [...results, `${teamA} beat ${teamB}`]
    )

    // TEAM B WINS
    const tableB = structuredClone(currentTable)

    const winnerB = tableB.find(
      t => t.team === teamB
    )

    if (winnerB) {
      winnerB.points += 2
    }

    simulate(
      matchIndex + 1,
      tableB,
      [...results, `${teamB} beat ${teamA}`]
    )
  }

  simulate(0, table, [])

  const overallChance =
    (
      qualifyingScenarios /
      totalScenarios
    ) * 100

  type MatchAnalysis = {
    match: string
    result1: string
    result2: string
    chance1: number
    chance2: number
    importance: number
  }

  const analyses: MatchAnalysis[] = []

  fixtures.forEach(match => {

    const [teamA, teamB] = match

    const resultA =
      `${teamA} beat ${teamB}`

    const resultB =
      `${teamB} beat ${teamA}`

    const statsA = resultStats[resultA]
    const statsB = resultStats[resultB]

    if (!statsA || !statsB) {
      return
    }

    const chanceA =
      (statsA.qualified / statsA.total) * 100

    const chanceB =
      (statsB.qualified / statsB.total) * 100

    const rawImportance =
      Math.abs(chanceA - chanceB)

    analyses.push({
      match: `${teamA} vs ${teamB}`,
      result1: resultA,
      result2: resultB,
      chance1: chanceA,
      chance2: chanceB,
      importance: rawImportance
    })

  })

  const maxImportance =
    analyses.length > 0
      ? Math.max(
          ...analyses.map(
            a => a.importance
          )
        )
      : 1

  const normalizedAnalyses =
    analyses.map(a => ({
      ...a,
      importance:
        maxImportance === 0
          ? 0
          : (a.importance / maxImportance) * 100
    }))

  return {
    targetTeam,
    overallChance,
    matches: normalizedAnalyses
  }
}