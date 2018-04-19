const schedule = require('../models/scheduleModel').schedule;

const getSchedule = (req, res) => {
    // Get All Shifts in Schedule
    schedule.find({}).lean().exec((err, allShifts) => {
      if (err) {
          res.send('error has occurred')
      }
      else {
          res.send(allShifts[0])
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

        requestedShifts = parseShifts(allShifts[0], req.params.day)
        res.send(requestedShifts)
    }
  })
}

// Helper Function for getDay
const parseShifts = (shifts, day) => {
  var requestedShifts = []
  // Gets 18 shifts
  for (let i = (day * 18); i < (day*18) + 18; i++) {
    requestedShifts.push(shifts.week[i])
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

const addUserToShift = (req, res) => {
  // Schedules user for shift
  // parameters in url
  const day = req.params.day
  const hour = req.params.hour
  // body is object passed into request
  const user = req.body.user
  schedule.find({}, (err, shifts) => {
    if (err) {
      res.send(err)
    }
    // let original_shifts = shifts[0].week
    // Gets shift object from correct day and hour
    shift = findShift(shifts[0], day, hour)
    newScheduled = shift.scheduled
    // if user already scheduled, send back error 
    if (newScheduled.indexOf(user) >= 0) {
      res.send("User Already Scheduled")
    }
    else {
      // Add user to scheduled array
      newScheduled.push(user)
      shift.scheduled = newScheduled
      // Replaces entire week schedule to accomodate for changes
      schedule.replaceOne({}, {week: shifts[0].week}).exec((err, doc) => {
        if (err) {
          console.log("Rip")
        }
        res.send("Success")
      })
    }
  })
}

const removeUserFromShift = (req, res) => {
  // Schedules user for shift
  const day = req.params.day
  const hour = req.params.hour
  const user = req.body.user
  schedule.find({}, (err, shifts) => {
    if (err) {
      res.send(err)
    }
    let original_shifts = shifts[0].week
    shift = findShift(shifts[0], day, hour)
    newScheduled = shift.scheduled
    if (newScheduled.indexOf(user) < 0) {
      res.send("User Not Scheduled")
    }
    else {
      // sequence of steps to remove user
      // get user index
      user_index = newScheduled.indexOf(user)
      // splice array, returns new array
      newScheduled.splice(user_index, 1)
      shift.scheduled = newScheduled
      // Replaces entire week schedule to accomodate for changes
      schedule.replaceOne({}, {week: shifts[0].week}).exec((err, doc) => {
        if (err) {
          console.log("Rip")
        }
        res.send("Success")
      })
    }
  })
}

const findShift = (shifts, day, hour) => {
  // Gets shifts from a day
  shifts = parseShifts(shifts, day)
  // Finds specified shift
  return shifts[hour]
}

module.exports = app => {
    app.get('/api/schedule', getSchedule)
    app.get('/api/schedule/:day?', getDay)
    app.put('/api/schedule/shift/:day?/:hour?', addUserToShift)
    app.delete('/api/schedule/shift/:day?/:hour?', removeUserFromShift)
}
