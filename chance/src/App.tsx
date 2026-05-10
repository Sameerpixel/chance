import { useEffect, useState } from "react"

type Match = {
  match: string
  result1: string
  result2: string
  chance1: number
  chance2: number
  importance: number
}

type ApiResponse = {
  targetTeam: string
  simulations: number
  overallChance: number
  matches: Match[]
}

const teams = [
  "SRH",
  "GT",
  "PBKS",
  "RCB",
  "RR",
  "CSK",
  "KKR",
  "DC",
  "MI",
  "LSG"
]

function App() {

  const [selectedTeam, setSelectedTeam] =
    useState("RCB")

  const [data, setData] =
    useState<ApiResponse | null>(null)

  useEffect(() => {

    async function fetchData() {

      try {

        const response = await fetch(
          `http://localhost:3000/team/${selectedTeam}`
        )

        const json = await response.json()

        console.log(json)

        setData(json)

      } catch (error) {

        console.log(error)

      }
    }

    fetchData()

  }, [selectedTeam])

  if (!data) {
    return <h1>Loading...</h1>
  }

  return (

    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        color: "white"
      }}
    >

      <h1>IPL Monte Carlo Simulator</h1>

      <select
        value={selectedTeam}
        onChange={(e) =>
          setSelectedTeam(e.target.value)
        }
      >

        {teams.map(team => (

          <option
            key={team}
            value={team}
          >
            {team}
          </option>

        ))}

      </select>

      <h2>
        {data.targetTeam}
        {" "}
        Playoff Chance
      </h2>

      <h1>
        {data.overallChance.toFixed(2)}%
      </h1>

      <p>
        Simulations:
        {" "}
        {data.simulations}
      </p>

      <hr />

      {data.matches.map(match => (

        <div
          key={match.match}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}
        >

          <h2>{match.match}</h2>

          <p>
            Importance:
            {" "}
            {match.importance}
            /100
          </p>

          <p>
            {match.result1}
            {" → "}
            {match.chance1}%
          </p>

          <p>
            {match.result2}
            {" → "}
            {match.chance2}%
          </p>

        </div>

      ))}

    </div>
  )
}

export default App