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
  var requestedShifts = []
  // Gets 18 shifts
  for (var i = (day * 18); i < i + 18; i++) {
    requestedShifts.push(shifts[i])
  }
  return requestedShifts
}

const getShift = (req, res) => {
  // Get a specific shift
  schedule.find({}).lean().exec((err, allShifts) => {
    if (err) {
        res.send('error has occurred')
    } 
    else {
        requestedShift = allShifts[(req.params.day * 18) + req.params.hour]
        res.send(requestedShift)
    }
  })
}

const getAvailability = (req, res) => {
  // Get the shifts of a certain user with a specified availability type
  schedule.find({}).lean().exec((err, allShifts) => {
    if (err) {
        res.send('error has occurred')
    } 
    else {
        filtered_shifts = r[0].week.filter(shift => shift[req.params.netid] = req.params.availability)
        res.send(filtered_shifts)
    }
  })
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
    app.get('/schedule/:day?/:hour?', getShift)
    app.get('/schedule/:availability?/:netid?', getAvailability)
    app.put('/schedule/shift/:day?/:hour?', changeShift)
}

