var mongoose     = require('mongoose')
    , Schema       = mongoose.Schema
require('../db')

// New Schedule Model
var ScheduleSchema = 
    new Schema({
      
      week: {type: [ShiftSchema], validate: [(val) => {return val.length <= 170}, "Number of shifts exceeds total"]} // Array of Shifts
      
    })

var ShiftSchema = 
    new Schema({
      
      scheduled: [],
      status: Boolean // Is it open or closed at the time
      // NetIDs will be assigned to values 1-4, 1 meaning least preferred and 4 meaning most preferred
      // ex: 'wsm3: 4'
      
    },
    {strict: false} // Allows us to continue adding properties
  )


var Schedule = mongoose.model("schedules", ScheduleSchema)

exports.schedule = Schedule
