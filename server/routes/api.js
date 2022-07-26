const express = require('express')
const router = express.Router()
const urllib = require('urllib')

const teamToIDs = {
  lakers: '1610612747',
  warriors: '1610612744',
  heat: '1610612748',
  suns: '1610612756',
}

let parsedTeamData = {}
let dreamTeam = []

urllib.request(
  `http://data.nba.net/10s/prod/v1/2018/players.json`,
  function (err, data, response) {
    if (err) {
      throw err
    }
    response.body
    parsedTeamData = JSON.parse(data).league.standard
  }
)

router.get('/teams/:teamName', (req, res) => {
  const param = req.params.teamName
  let result = parsedTeamData
    .filter((team) => team.teamId === teamToIDs[param] && team.isActive)
    .map((t) => {
      return {
        firstName: t.firstName,
        lastName: t.lastName,
        jersey: t.jersey,
        pos: t.pos,
      }
    })
    .filter((t) => !['5', '00', '0', '55', '32', '10'].includes(t.jersey))
  res.send(result)
})

router.put('/team/', (req, res) => {
  const team = req.body

  teamToIDs[team.teamName] = team.teamId

  res.send(teamToIDs)
})

router.get('/dreamTeam', (req, res) => res.send(dreamTeam.slice(0, 5)))

router.post('/roster', (req, res) => {
  let player = req.body
  // dreamTeam.forEach(element => {
  //   if (element===player) {
  //     return "player already exist"
  //   }else dreamTeam.push(player)
  // })
  
  dreamTeam.push(player)
  res.send(player)
})

router.delete("/:dreamTeam_id", function(req, res) {
  dreamTeam.findByIdAndDelete(req.params.dreamTeam_id)
    .then(dreamTeam => {
      if (dreamTeam) {
        return res.status(200).json(`Player deleted! Deleted player: ${dreamTeam}`)
      } else {
        return res.status(404).send("Player not found")
      }
    })
    .catch(err => {
      res.status(500).send(`Error details: ${err.message}`)
    })
})

module.exports = router
