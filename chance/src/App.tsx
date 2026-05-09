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
  overallChance: number
  matches: Match[]
}

const teams = [
  "RCB",
  "MI",
  "GT",
  "CSK",
  "LSG",
  "KKR",
  "SRH",
  "DC",
  "PBKS",
  "RR"
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

      <h1>IPL Playoff Chances</h1>

      <select
        value={selectedTeam}
        onChange={(e) =>
          setSelectedTeam(e.target.value)
        }
        style={{
          padding: "10px",
          marginBottom: "20px"
        }}
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
        Qualification Chance
      </h2>

      <h1>
        {Number(data.overallChance).toFixed(2)}%
      </h1>

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
            {Number(match.importance).toFixed(0)}
            /100
          </p>

          <p>
            {match.result1}
            {" → "}
            {Number(match.chance1).toFixed(2)}%
          </p>

          <p>
            {match.result2}
            {" → "}
            {Number(match.chance2).toFixed(2)}%
          </p>

        </div>

      ))}

    </div>
  )
}

export default App