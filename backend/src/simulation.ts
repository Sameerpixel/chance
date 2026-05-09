import { table, fixtures } from "./data"

let totalScenarios = 0
let qualifyingScenarios = 0

const targetTeam = "CSK"

const resultStats: Record<
  string,
  {
    total: number
    qualified: number
  }
> = {}

type Team = {
  team: string
  points: number
}

function simulate(
  matchIndex: number,
  currentTable: Team[],
  results: string[]
) {

  // BASE CASE
  if (matchIndex === fixtures.length) {

    totalScenarios++

    const sortedTable = [...currentTable].sort(
      (a, b) => b.points - a.points
    )

    const top2 = sortedTable.slice(0, 2)

    const qualified = top2.some(
      team => team.team === targetTeam
    )

    console.log("SCENARIO")
    console.log(results)

    console.log("FINAL TABLE")
    console.log(sortedTable)

    console.log(
      qualified
        ? `${targetTeam} QUALIFIED`
        : `${targetTeam} ELIMINATED`
    )

    console.log("-------------------")

    if (qualified) {
      qualifyingScenarios++
    }

    // TRACK RESULT STATS
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

  const [teamA, teamB] = fixtures[matchIndex]!

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

console.log("=================================")

console.log(
  `${targetTeam} OVERALL QUALIFICATION CHANCE:`,
  (
    qualifyingScenarios / totalScenarios * 100
  ).toFixed(2),
  "%"
)

console.log("=================================")

type MatchAnalysis = {
  match: string
  chanceA: number
  chanceB: number
  rawImportance: number
}

const analyses: MatchAnalysis[] = []

fixtures.forEach(match => {

  const [teamA, teamB] = match

  const resultA = `${teamA} beat ${teamB}`
  const resultB = `${teamB} beat ${teamA}`

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
    chanceA,
    chanceB,
    rawImportance
  })

})

const maxImportance = Math.max(
  ...analyses.map(a => a.rawImportance)
)

console.log("MATCH ANALYSIS")

analyses.forEach(a => {

  const normalizedImportance =
    (a.rawImportance / maxImportance) * 100

  console.log(`MATCH: ${a.match}`)

  console.log(
    `Outcome 1 Qualification Chance -> ${a.chanceA.toFixed(2)}%`
  )

  console.log(
    `Outcome 2 Qualification Chance -> ${a.chanceB.toFixed(2)}%`
  )

  console.log(
    `IMPORTANCE SCORE -> ${normalizedImportance.toFixed(0)}/100`
  )

  console.log("---------------------------------")

})