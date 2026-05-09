import express from "express"
import cors from "cors"

import { calculatePlayoffChances }
from "./playoffCalculator"

const app = express()

app.use(cors())

app.get("/", (req, res) => {
  res.send("Server running")
})

app.get("/team/:teamName", (req, res) => {

  const teamName = req.params.teamName

  const data =
    calculatePlayoffChances(teamName)

  res.json(data)

})

app.listen(3000, () => {
  console.log(
    "Server started on port 3000"
  )
})