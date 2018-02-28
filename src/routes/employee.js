const schedule = require('../models/scheduleModel').schedule;

const getEmployeeAvailability = (req, res) => {
  // Gets employee from url parameters
  const employee = req.params.netid
  const availabilityArray = []
  // Gets entire schedule
  schedule.find({}).exec((err, shifts) => {
    // Array of shifts
    let week = shifts[0].week
    if (err) {
      res.send('error has occurred')
    }
    else {
      // Iterate through all shifts
      for (let i = 0; i < week.length; i++) {
        // Get current shift
        let shift = week[i]
        // Get value from property not strictly defined in model
        let availability = shift.get(employee)
        // If value is found, add preference to array
        if (availability != undefined) {
          availabilityArray.push(availability)
        }
        else {
          // Value not found, so preference is set to 0
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
  // Get entire schedule
  schedule.find({}).exec((err, shifts) => {
    // Array of shifts
    let week = shifts[0].week
    if (err) {
      res.send("error has occurred")
    }
    else {
      // Iterate through each shift
      for (let i = 0; i < week.length; i++) {
        let shift = week[i]
        // Get array of people scheduled
        let scheduled = shift.scheduled
        // Add to array a value of True or False; True if employee is scheduled, False otherwise
        scheduledArray.push(scheduled.indexOf(employee) > -1)
      }
      res.send(scheduledArray)
    }
  })

}


module.exports = app => {
    app.get('/employee/available/:netid', getEmployeeAvailability)
    app.get('/employee/scheduled/:netid', getEmployeeScheduled)
    getEmployeeScheduled
}
