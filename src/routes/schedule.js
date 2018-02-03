const schedule = require('../models/scheduleModel').schedule;

const getSchedule = (req, res) => {
    // Get All Shifts in Schedule
    schedule.find({}).lean().exec((err, allShifts) => {
      if (err) {
          res.send('error has occurred')
      } 
      else {
          res.send(allShifts)
      }
    })
}

const getDay = (req, res) => {
  // Get All Shifts in Schedule
  schedule.find({}).lean().exec((err, allShifts) => {
    if (err) {
        res.send('error has occurred')
    } 
    else {
        requestedShifts = parseShifts(allShifts, req.params.day)
        res.send(requestedShifts)
    }
  })
}

// Helper Function for getDay
const parseShifts = (shifts, day) => {
  let requestedShifts = []
  // Gets 18 shifts
  for (let i = (day * 18); i < i + 18; i++) {
    requestedShifts.push(shifts[i])
  }
  return requestedShifts
}

const changeShift = (req, res) => {
  const day = req.params.day
  const hour = req.params.hour
  // schedule.find({}).
  // Unfinished
}

module.exports = app => {
    app.get('/schedule', getSchedule)
    app.get('/schedule/:day?', getDay)
    app.put('/schedule/shift/:day?/:hour?', changeShift)
}

