const schedule = require('../models/scheduleModel').schedule;

const getEmployeeAvailability = (req, res) => {
  const employee = req.params.netid
  const availabilityArray = []
  schedule.find({}).exec((err, shifts) => {
    let week = shifts[0].week
    if (err) {
      res.send('error has occurred')
    }
    else {
      for (let i = 0; i < week.length; i++) {
        let shift = week[i]
        console.log(shift.get("wsm3"))
        let availability = shift.get("wsm3")
        if (availability != undefined) {
          availabilityArray.push(availability)
        }
        else {
          availabilityArray.push(0)
        }
      }
      res.send(availabilityArray)
    }
  })
}

const getEmployeeScheduled = (req, res) => {
  const employee = req.params.netid
  const scheduledArray = []
  schedule.find({}).exec((err, shifts) => {
    let week = shifts[0].week
    if (err) {
      res.send("error has occurred")
    }
    else {
      for (let i = 0; i < week.length; i++) {
        let shift = week[i]
        let scheduled = shift.scheduled
        scheduledArray.push(scheduled.indexOf(employee) > -1)
      }
      res.send(scheduledArray)
    }
  })

}


module.exports = app => {
    app.get('/employee/available/:netid', getEmployeeAvailability)
    app.get('/employee/scheduled/:netid', getEmployeeScheduled)
}
