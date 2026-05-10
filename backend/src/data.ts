export type Team = {
  team: string
  points: number
  nrr: number
}

export const table: Team[] = [

  {
    team: "SRH",
    points: 14,
    nrr: 0.737
  },

  {
    team: "GT",
    points: 14,
    nrr: 0.228
  },

  {
    team: "PBKS",
    points: 13,
    nrr: 0.571
  },

  {
    team: "RCB",
    points: 12,
    nrr: 1.234
  },

  {
    team: "RR",
    points: 12,
    nrr: 0.082
  },

  {
    team: "CSK",
    points: 10,
    nrr: 0.151
  },

  {
    team: "KKR",
    points: 9,
    nrr: -0.169
  },

  {
    team: "DC",
    points: 8,
    nrr: -1.154
  },

  {
    team: "MI",
    points: 6,
    nrr: -0.649
  },

  {
    team: "LSG",
    points: 6,
    nrr: -0.934
  }

]

export const fixtures: [string, string][] = [

  ["CSK", "LSG"],
  ["RCB", "MI"],

  ["PBKS", "DC"],
  ["GT", "SRH"],

  ["RCB", "KKR"],
  ["PBKS", "MI"],

  ["LSG", "CSK"],
  ["KKR", "GT"],

  ["PBKS", "RCB"],
  ["DC", "RR"],

  ["CSK", "SRH"],
  ["RR", "LSG"],

  ["KKR", "MI"],
  ["GT", "CSK"],

  ["SRH", "RCB"],
  ["LSG", "PBKS"],

  ["MI", "RR"],
  ["KKR", "DC"]

]