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

const addUserToShift = (req, res) => {
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
    newScheduled.push(user)
    shift.scheduled = newScheduled
    let id = shift._id
    schedule.replaceOne({}, {week: shifts[0].week}).exec((err, doc) => {
      if (err) {
        console.log("Rip")
      }
      console.log("yay")
      res.send("Success")
    })
    // schedule.findOne({"_id": shift._id}, (err, shift) => {
    //   if (err) {
    //     return err
    //   }
    //   console.log(shift)
    //   shift.save()
    // })
    // Trying elemMatch (elmeme)
    // schedule.find({week: {$elemMatch: {_id: id}}}, (err, doc) => {
    //   if (err) {
    //     console.log(err)
    //     console.log("Oops! An error occurred.")
    //   }
    //   res.send(doc)
    // })
    //
    // shifts[0].week.findOneAndUpdate({_id: id}, {$set:{scheduled: newScheduled}}, (err, doc) => {
    //   if (err) {
    //     console.log("Oops! Something went wrong.")
    //   }
    //   console.log(doc)
    //   res.send(doc)
    // })
    // let shiftIndex = shifts[0].week.indexOf(shift)
    // shifts[0].week[shiftIndex].markModified('scheduled')
    // shifts[0].week[shiftIndex].save((err) => {
    //   if (err) {
    //     console.log(err)
    //   }
    //   console.log("saved!")
    // })
    // res.send(shift)
  })
  // Unfinished
}

const findShift = (shifts, day, hour) => {
  // Gets shifts from a day
  shifts = parseShifts(shifts, day)
  // Finds specified shift
  return shifts[hour]
}

module.exports = app => {
    app.get('/schedule', getSchedule)
    app.get('/schedule/:day?', getDay)
    app.put('/schedule/shift/:day?/:hour?', addUserToShift)
}
