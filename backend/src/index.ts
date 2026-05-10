import express from "express"
import cors from "cors"

import {
  monteCarloPlayoffCalculator
} from "./monteCarloCalculator"

const app = express()

app.use(cors())

app.get("/", (req, res) => {

  res.send(
    "Monte Carlo server running"
  )

})

app.get("/team/:teamName", (req, res) => {

  const teamName =
    req.params.teamName

  const result =
    monteCarloPlayoffCalculator(
      teamName
    )

  res.json(result)

})

app.listen(3000, () => {

  console.log(
    "Server started on port 3000"
  )

})