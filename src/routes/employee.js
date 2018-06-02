var _ = require('lodash')
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

/**
 * 
 * @param {*} shifts 
 * @param {*} netid 
 */
const reformatShifts = (shifts, netid) => {
  // {  
  //   "shifts":{  
  //      "Monday":[  
  //         {  
  //            "hour":7,
  //            "available":0,
  //            "changed":false,
  //            "closed":false
  //         }, ...


  // reformat shifts into (ordered sequence of objects):
  // {<employeename>: <preference>, changed: true/false}
  reformattedShifts = []

  // Object.keys(shifts) starts at Monday, we need it to start on Sunday
  let weekDays = Object.keys(shifts).splice(0, 6)
  weekDays.splice(0, 0, 'Sunday')

  weekDays.map(day => {
    let dayShifts = shifts[day]
    for (let i = 0; i < shifts[day].length; i++) {
      if (dayShifts[i].changed) {
      }
      reformattedShifts.push({[netid]: dayShifts[i].available, changed: dayShifts[i].changed})
    }
  })

  return reformattedShifts
}

const setEmployeeAvailability = (req, res) => {
  const employee = req.params.netid
  const inputShifts = req.body.shifts
  // Will need to reformat this data
  // Now data represented like: {changed: true/false, netid: preference#}
  const reformattedShifts = reformatShifts(inputShifts, employee)
  // Get Schedule
  schedule.find({}).exec((err, shifts) => {
    // Array of already set shifts
    let week = shifts[0].week
    // Check if different input size; if so, stop
    if (reformattedShifts.length != week.length) {
      res.status(500).send("Error: Shifts Length Mismatch")
      return
    }
    // Iterate through each shift in input shifts, see if anything changed
    for (let i = 0; i < reformattedShifts.length; i++) {
      let inputShift = reformattedShifts[i]
      var shift = week[i]
      // Check if shift changed
      if (inputShift.changed) {
        shift.set({[employee]: inputShift[employee]})
      }
    }
    // Then replace current stuff with this new one
    schedule.replaceOne({}, {week: shifts[0].week}, (err, doc) => {
      if (err) {
        console.log(err)
      }
      res.send(200)
    })
  })
}


module.exports = app => {
    app.get('/api/employee/available/:netid', getEmployeeAvailability)
    app.get('/api/employee/scheduled/:netid', getEmployeeScheduled)
    app.put('/api/employee/available/:netid', setEmployeeAvailability)
    getEmployeeScheduled
}
