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
  let requestedShifts = []
  // Gets 18 shifts
  for (let i = (day * 18); i < (day*18) + 18; i++) {
    requestedShifts.push(shifts.week[i])
  }
  return requestedShifts
}

// const addUserToShift = (req, res) => {
//   // Schedules user for shift
//   const day = req.params.day
//   const hour = req.params.hour
//   const user = req.body.user
//   schedule.find({}, (err, shifts) => {
//     if (err) {
//       res.send(err)
//     }
//     shift = findShift(shifts[0], day, hour)
//     newScheduled = shift.scheduled
//     newScheduled.push(user)
//     shift.scheduled = newScheduled
//     // let id = shift
//     console.log(shift)
//     schedule.findOne({id: id}, (err, shift) => {
//       if (err) {
//         return err
//       }
//       // console.log(shift)
//       shift.save()
//     })
//     // shift.markModified('scheduled')
//     // shift.save((err) => {
//     //   if (err) {
//     //     console.log(err)
//     //   }
//     //   console.log("saved!")
//     // })
//     res.send(shift)
//   })
//   // Unfinished
// }

const findShift = (shifts, day, hour) => {
  // Gets shifts from a day
  shifts = parseShifts(shifts, day)
  // Finds specified shift
  return shifts[hour]
}

module.exports = app => {
    app.get('/schedule', getSchedule)
    app.get('/schedule/:day?', getDay)
    // app.put('/schedule/shift/:day?/:hour?', addUserToShift)
}
